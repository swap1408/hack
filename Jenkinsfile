pipeline {
  agent any

  environment {
    REGISTRY           = 'docker.io/swapnilneo'
    BACKEND_IMAGE      = 'hack-backend'
    FRONTEND_IMAGE     = 'hack-frontend'
    IMAGE_TAG          = "${env.BUILD_NUMBER}"
    DOCKER_CREDENTIALS = 'docker-hub-creds'   // Docker Hub creds ID
    SSH_CREDENTIALS    = 'ansible-ssh-key'    // SSH key creds ID
    DEPLOY_HOST        = '172.31.19.56'       // Target EC2 IP
    DEPLOY_USER        = 'ubuntu'             // SSH username
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
          echo "🏗️ Building backend & frontend images..."
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
          withCredentials([sshUserPrivateKey(credentialsId: SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY')]) {
            echo "🚀 Deploying to ${DEPLOY_HOST}..."
            sh """
              # Copy docker-compose.yml to remote host
              scp -i \$SSH_KEY -o StrictHostKeyChecking=no docker-compose.yml ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/docker-compose.yml

              # SSH into EC2 and run deployment
              ssh -i \$SSH_KEY -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
                cd /tmp &&
                BACKEND_IMAGE=${BACKEND_FULL_IMAGE} FRONTEND_IMAGE=${FRONTEND_FULL_IMAGE} \\
                docker-compose pull &&
                BACKEND_IMAGE=${BACKEND_FULL_IMAGE} FRONTEND_IMAGE=${FRONTEND_FULL_IMAGE} \\
                docker-compose up -d --remove-orphans
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
