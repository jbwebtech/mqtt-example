# Use the official Eclipse Mosquitto image as the base
FROM eclipse-mosquitto:latest

# Expose the default MQTT ports
EXPOSE 1883 9001

# Copy the mosquitto configuration file
COPY mosquitto.conf /mosquitto/config/mosquitto.conf
