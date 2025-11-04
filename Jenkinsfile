pipeline {
  agent any

  environment {
    REGISTRY          = 'docker.io/swapnilneo'
    BACKEND_IMAGE     = 'hack-backend'
    FRONTEND_IMAGE    = 'hack-frontend'
    IMAGE_TAG         = "${env.BUILD_NUMBER}"
    DOCKER_CREDENTIALS = 'docker-hub-creds'   // Docker Hub credentials ID
    SSH_CREDENTIALS    = 'ansible-ssh-key'    // SSH key credentials ID
    DEPLOY_HOST        = '172.31.19.56'       // ✅ Fixed EC2 server
    DEPLOY_USER        = 'ubuntu'             // ✅ Fixed SSH user
    BACKEND_FULL_IMAGE = "${REGISTRY}/${BACKEND_IMAGE}:${IMAGE_TAG}"
    FRONTEND_FULL_IMAGE = "${REGISTRY}/${FRONTEND_IMAGE}:${IMAGE_TAG}"
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/swap1408/hack.git'
      }
    }

    stage('Build backend & frontend images') {
      steps {
        script {
          echo "🏗️ Building backend & frontend images using docker-compose..."
          sh """
            BACKEND_IMAGE=${BACKEND_FULL_IMAGE} \
            FRONTEND_IMAGE=${FRONTEND_FULL_IMAGE} \
            docker-compose build
          """
        }
      }
    }

    stage('Push images to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            echo "📦 Pushing images to Docker Hub..."
            sh """
              echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
              docker push ${BACKEND_FULL_IMAGE}
              docker push ${FRONTEND_FULL_IMAGE}
              docker logout
            """
          }
        }
      }
    }

    stage('Deploy to EC2 via SSH (docker-compose)') {
      steps {
        script {
          sshagent([SSH_CREDENTIALS]) {
            echo "🚀 Deploying on ${DEPLOY_HOST} using docker-compose..."
            sh """
              # Copy docker-compose file to remote host
              scp -o StrictHostKeyChecking=no docker-compose.yml ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/docker-compose.yml

              # SSH into remote host, pull latest images, and restart containers
              ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
                export BACKEND_IMAGE=${BACKEND_FULL_IMAGE} &&
                export FRONTEND_IMAGE=${FRONTEND_FULL_IMAGE} &&
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
      echo "✅ Build #${env.BUILD_NUMBER} completed successfully and deployed to ${DEPLOY_HOST}!"
    }
    failure {
      echo "❌ Build failed — check console logs for details."
    }
  }
}
