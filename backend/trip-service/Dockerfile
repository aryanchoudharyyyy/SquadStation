# ==========================================
# STAGE 1: BUILD STAGE
# ==========================================
# 1. Pull a heavy image containing Maven and Java 17, and name this stage 'build'
FROM maven:3.9.4-eclipse-temurin-21 AS build

# 2. Set a working directory inside the container named /app
WORKDIR /app

# 3. Copy ONLY the pom.xml file first
COPY pom.xml .


# 4. Download the dependencies
# We do this before copying the source code so that if only the code changes,
# Docker does not have to download all the dependencies again.
# It can reuse the previously cached dependencies, making the build much faster.
RUN mvn dependency:go-offline -B


# 5. Now copy the rest of the Java code (src folder)
COPY src ./src


# 6. Run Maven command to create the JAR file
# Skip tests to save build time
RUN mvn clean package -DskipTests

# ==========================================
# STAGE 2: RUNTIME STAGE
# ==========================================

# 7. Pull a completely new, lightweight image that only has Java Runtime (JRE)
# Maven is not needed here


FROM eclipse-temurin:21-jre-alpine
# 8. Set the working directory to /app
WORKDIR /app

# 9. MAGIC LINE:
# Take the JAR file from the /app/target folder of Stage 1 (named 'build')
# and save it as 'app.jar' in this new image
COPY --from=build /app/target/*.jar app.jar

# 10. Command to run the JAR file when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]
