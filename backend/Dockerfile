# Stage 1: Build stage using JDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and source
COPY pom.xml .
COPY src ./src

# Build the app (skip tests to speed up)
RUN mvn clean package -DskipTests

# Stage 2: Run stage using JDK 21
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Environment variables for PostgreSQL connection
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/mockdb
ENV SPRING_DATASOURCE_USERNAME=admin
ENV SPRING_DATASOURCE_PASSWORD=admin


EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

