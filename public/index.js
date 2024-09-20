// Register the Service Worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('/sw.js')
      .then(registration => {          
          // Ask for Notification Permission
          Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                  // Subscribe the user to push notifications
                  subscribeUserToPush(registration);
              } else {
                  console.log('Notification permission denied.');
              }
          });
      })
      .catch(error => {
          console.error('Service Worker registration failed:', error);
      });
}

// Function to subscribe user to Push notifications
const subscribeUserToPush = async (registration) => {
  try {
      const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BEjmqSY1Gw_NiBf8r7Nk8z8-aFO8aRc2Y3no3UViC7Y6M0BmsDG-38RQIBT6VJvK1L2cJqQTIf5aVVFOKCOM8Bw'  
      });

      await saveSubscriptionToServer(subscription);
  } catch (error) {
      console.error('Failed to subscribe user:', error);
  }
};

const saveSubscriptionToServer = async (subscription) => {
  await fetch('https://dev.vibegurukul.in/api/v1/notification/save-subscription', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
          'Content-Type': 'application/json'
      }
  });
};
