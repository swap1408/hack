pipeline {
  agent any

  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to build')
    string(name: 'REGISTRY', defaultValue: 'docker.io/swapnilneo', description: 'Docker Hub registry path')
    string(name: 'BACKEND_IMAGE', defaultValue: 'hack-backend', description: 'Backend image name')
    string(name: 'FRONTEND_IMAGE', defaultValue: 'hack-frontend', description: 'Frontend image name')
    string(name: 'IMAGE_TAG', defaultValue: "${env.BUILD_NUMBER}", description: 'Docker image tag')
    choice(name: 'DEPLOY_METHOD', choices: ['none','ssh'], description: 'Deploy method (none or ssh)')
    string(name: 'DEPLOY_HOST', defaultValue: '172.31.4.176', description: 'Target EC2 host IP')
    string(name: 'DEPLOY_USER', defaultValue: 'ubuntu', description: 'SSH user for deployment')
  }

  environment {
    DOCKER_CREDENTIALS = 'docker-hub-creds'   // Docker Hub creds ID
    SSH_CREDENTIALS    = 'ansible-ssh-key'    // SSH creds ID
    BACKEND_FULL_IMAGE = "${params.REGISTRY}/${params.BACKEND_IMAGE}:${params.IMAGE_TAG}"
    FRONTEND_FULL_IMAGE = "${params.REGISTRY}/${params.FRONTEND_IMAGE}:${params.IMAGE_TAG}"
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: "${params.BRANCH}", url: 'https://github.com/swap1408/hack.git'
      }
    }

    stage('Build backend & frontend images') {
      steps {
        script {
          echo "🏗️ Building backend & frontend images using docker-compose..."
          sh """
            BACKEND_IMAGE=${env.BACKEND_FULL_IMAGE} \
            FRONTEND_IMAGE=${env.FRONTEND_FULL_IMAGE} \
            docker-compose build
          """
        }
      }
    }

    stage('Push images to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            echo "📦 Pushing images to Docker Hub..."
            sh """
              echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
              docker push ${env.BACKEND_FULL_IMAGE}
              docker push ${env.FRONTEND_FULL_IMAGE}
              docker logout
            """
          }
        }
      }
    }

    stage('Deploy to EC2 via SSH (docker-compose)') {
      when { expression { return params.DEPLOY_METHOD == 'ssh' } }
      steps {
        script {
          sshagent([env.SSH_CREDENTIALS]) {
            echo "🚀 Deploying on ${params.DEPLOY_HOST} using docker-compose..."
            sh """
              # Copy docker-compose file to remote host
              scp -o StrictHostKeyChecking=no docker-compose.yml ${params.DEPLOY_USER}@${params.DEPLOY_HOST}:/tmp/docker-compose.yml

              # SSH into remote host, pull latest images, and restart containers
              ssh -o StrictHostKeyChecking=no ${params.DEPLOY_USER}@${params.DEPLOY_HOST} '
                export BACKEND_IMAGE=${env.BACKEND_FULL_IMAGE} &&
                export FRONTEND_IMAGE=${env.FRONTEND_FULL_IMAGE} &&
                cd /tmp &&
                sudo docker-compose pull &&
                sudo docker-compose up -d --remove-orphans
              '
            """
          }
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      echo "✅ Build #${env.BUILD_NUMBER} completed successfully!"
    }
    failure {
      echo "❌ Build failed — check console logs for details."
    }
  }
}
