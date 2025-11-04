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

    // ✅ NEW: Ensure Docker Hub Repositories Exist
    stage('Ensure Docker Hub Repositories Exist') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            echo "🧩 Ensuring Docker Hub repositories exist or are updated..."
            sh """
              for repo in ${BACKEND_IMAGE} ${FRONTEND_IMAGE}; do
                echo "Checking repository: \$repo"
                RESPONSE=\$(curl -s -o /dev/null -w "%{http_code}" -u \$DOCKER_USER:\$DOCKER_PASS https://hub.docker.com/v2/repositories/\$DOCKER_USER/\$repo/)
                
                if [ "\$RESPONSE" = "404" ]; then
                  echo "🔧 Repository \$repo not found — creating..."
                  curl -s -u \$DOCKER_USER:\$DOCKER_PASS -X POST https://hub.docker.com/v2/repositories/ -H "Content-Type: application/json" -d '{
                    "name": "'\$repo'",
                    "namespace": "'\$DOCKER_USER'",
                    "is_private": false,
                    "description": "Auto-created by Jenkins pipeline for project deployment"
                  }'
                else
                  echo "✅ Repository \$repo already exists — updating visibility to public..."
                  curl -s -u \$DOCKER_USER:\$DOCKER_PASS -X PATCH https://hub.docker.com/v2/repositories/\$DOCKER_USER/\$repo/ -H "Content-Type: application/json" -d '{
                    "is_private": false
                  }'
                fi
              done
            """
          }
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          echo "🏗️ Building backend & frontend Docker images manually..."
          sh """
            docker build -t ${BACKEND_FULL_IMAGE} ./backend
            docker build -t ${FRONTEND_FULL_IMAGE} ./frontend
          """
        }
      }
    }

    stage('Push Images to Docker Hub') {
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

              # SSH into EC2 and deploy containers
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
