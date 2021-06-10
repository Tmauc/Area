FROM alvrme/alpine-android-base

WORKDIR /usr/app
COPY . .

ENV BUILD_TOOLS "28.0.3"
ENV TARGET_SDK "28"

# Install SDK Packages
RUN ${ANDROID_HOME}/tools/bin/sdkmanager "build-tools;${BUILD_TOOLS}" "platforms;android-${TARGET_SDK}"

RUN ./gradlew build
