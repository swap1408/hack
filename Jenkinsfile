pipeline {
  agent any

  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to build')
    string(name: 'IMAGE_NAME', defaultValue: 'hack-app', description: 'Image name (without registry)')
    string(name: 'REGISTRY', defaultValue: 'docker.io/yourdockerhubuser', description: 'Docker Hub username/registry path')
    choice(name: 'DEPLOY_METHOD', choices: ['none','ssh','ansible'], description: 'Deploy after build? (ssh or ansible)')
    string(name: 'DEPLOY_HOST', defaultValue: '172.31.4.176', description: 'Target host IP for deployment')
    string(name: 'DEPLOY_USER', defaultValue: 'ubuntu', description: 'SSH user for remote deployment')
    string(name: 'IMAGE_TAG', defaultValue: "${env.BUILD_NUMBER}", description: 'Docker image tag')
  }

  environment {
    DOCKER_CREDENTIALS = 'docker-hub-creds'   // ✅ Your Docker Hub credentials ID
    SSH_CREDENTIALS    = 'ansible-ssh-key'    // ✅ Your SSH private key credentials ID
    FULL_IMAGE = "${params.REGISTRY}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
  }

  options { 
    ansiColor('xterm')
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: "${params.BRANCH}", url: 'https://github.com/swap1408/hack.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          echo "Building image ${env.FULL_IMAGE}"
          sh "docker build -t ${env.FULL_IMAGE} ."
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
              docker push ${env.FULL_IMAGE}
              docker logout
            """
          }
        }
      }
    }

    stage('Deploy via SSH') {
      when { expression { return params.DEPLOY_METHOD == 'ssh' } }
      steps {
        script {
          sshagent([env.SSH_CREDENTIALS]) {
            sh """
              ssh -o StrictHostKeyChecking=no ${params.DEPLOY_USER}@${params.DEPLOY_HOST} '
                docker pull ${env.FULL_IMAGE} &&
                docker rm -f ${params.IMAGE_NAME} || true &&
                docker run -d --name ${params.IMAGE_NAME} -p 80:80 ${env.FULL_IMAGE}
              '
            """
          }
        }
      }
    }

    stage('Deploy via Ansible') {
      when { expression { return params.DEPLOY_METHOD == 'ansible' } }
      steps {
        script {
          withCredentials([sshUserPrivateKey(credentialsId: env.SSH_CREDENTIALS, keyFileVariable: 'KEYFILE', usernameVariable: 'SSH_USER')]) {
            sh 'chmod 600 $KEYFILE || true'
            writeFile file: 'hosts.ini', text: "[targets]\n${params.DEPLOY_HOST} ansible_user=${params.DEPLOY_USER} ansible_ssh_private_key_file=${KEYFILE}\n"
            if (fileExists('playbook.yml')) {
              sh "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i hosts.ini playbook.yml --extra-vars image=${env.FULL_IMAGE}"
            } else {
              echo "No playbook.yml found — skipping Ansible deploy."
            }
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
      echo "✅ Build #${env.BUILD_NUMBER} succeeded: ${env.FULL_IMAGE}"
    }
    failure {
      echo "❌ Build failed — check console output for errors."
    }
  }
}
