pipeline {
  agent any

  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to build')
    string(name: 'REGISTRY', defaultValue: 'docker.io/yourdockerhubuser', description: 'Docker Hub registry path')
    string(name: 'BACKEND_IMAGE', defaultValue: 'hack-backend', description: 'Backend image name')
    string(name: 'FRONTEND_IMAGE', defaultValue: 'hack-frontend', description: 'Frontend image name')
    string(name: 'IMAGE_TAG', defaultValue: "${env.BUILD_NUMBER}", description: 'Image tag')
    choice(name: 'DEPLOY_METHOD', choices: ['none','ssh'], description: 'Deploy method (none or ssh)')
    string(name: 'DEPLOY_HOST', defaultValue: '172.31.4.176', description: 'Target host IP for deployment')
    string(name: 'DEPLOY_USER', defaultValue: 'ubuntu', description: 'SSH user for remote deployment')
  }

  environment {
    DOCKER_CREDENTIALS = 'docker-hub-creds'   // Docker Hub credentials ID
    SSH_CREDENTIALS    = 'ansible-ssh-key'    // SSH key credentials ID
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

    stage('Build Images via Docker Compose') {
      steps {
        script {
          echo "Building backend and frontend images with docker-compose..."
          sh """
            docker compose build \
              --build-arg BACKEND_IMAGE=${env.BACKEND_FULL_IMAGE} \
              --build-arg FRONTEND_IMAGE=${env.FRONTEND_FULL_IMAGE}
          """
        }
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
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

    stage('Deploy via SSH (docker-compose)') {
      when { expression { return params.DEPLOY_METHOD == 'ssh' } }
      steps {
        script {
          sshagent([env.SSH_CREDENTIALS]) {
            echo "Deploying to remote host ${params.DEPLOY_HOST} via docker-compose..."
            sh """
              scp -o StrictHostKeyChecking=no docker-compose.yml ${params.DEPLOY_USER}@${params.DEPLOY_HOST}:/tmp/docker-compose.yml
              ssh -o StrictHostKeyChecking=no ${params.DEPLOY_USER}@${params.DEPLOY_HOST} \\
                'export BACKEND_IMAGE=${env.BACKEND_FULL_IMAGE} && \\
                 export FRONTEND_IMAGE=${env.FRONTEND_FULL_IMAGE} && \\
                 docker compose -f /tmp/docker-compose.yml pull && \\
                 docker compose -f /tmp/docker-compose.yml up -d --remove-orphans'
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
      echo "✅ Build #${env.BUILD_NUMBER} completed successfully."
    }
    failure {
      echo "❌ Build failed — check console output for details."
    }
  }
}
