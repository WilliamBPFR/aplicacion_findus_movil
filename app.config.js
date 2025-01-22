module.exports = {
  expo: {
    name: "findUS",
    slug: "findUS",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      config: {
        usesNonExemptEncryption: false
      },
      supportsTablet: true,
      infoPlist: {
        NSPhotoLibraryUsageDescription: "Se requiere acceso a la biblioteca de fotos para seleccionar documentos."
      }
    },
    android: {
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      },
      package: "com.william_ferreira.findus",
      adaptiveIcon: {
        foregroundImage: "./assets/logo_findus.png",
        backgroundColor: "#ffffff"
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font",
      "expo-secure-store",
      ["expo-notifications",
      {
          icon: "./assets/notification_icon.png",
          color: "#ffffff",
          defaultChannel: "default",
          enableBackgroundRemoteNotifications: false
      }],
      ["expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Allow FindUS App to use your location."
      }
      ]
    ],
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "820bcd7d-5915-4620-89f1-d0d71b391918"
      }
    }
  }
}
