FROM openjdk:24-jdk

WORKDIR /app

RUN ls

COPY backend/spring-boot/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]