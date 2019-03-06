const addScript = (id, src, options) => new Promise((resolve, reject) => {
    const element = document.getElementById(id);
    if (element) {
        return resolve(true);
    }
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('id', id);
    script.setAttribute('src', src);
    script.addEventListener('load', resolve);
    script.addEventListener('error', () => reject(new Error(`Error loading ${id}.`)));
    script.addEventListener('abort', () => reject(new Error(`${id}  loading aborted.`)));
    document.getElementsByTagName('head')[0].appendChild(script);
});
export const addFacebookScript = () => {
    const id = 'facebookAuth';
    const src = 'https://connect.facebook.net/en_US/sdk.js';

    return addScript(id, src);
};

export const addGooglePhotosScript = (clientId) => new Promise((resolve, reject) => {
    const initAuth = function () {
        window.gapi.load('client:auth2', function () {
            window.gapi.auth2.init({
                client_id: clientId
            }).then(googleAuth => {
                if (googleAuth) {
                    if (googleAuth.isSignedIn.get()) {
                        const googleUser = googleAuth.currentUser.get();
                        return resolve(true);
                    }
                }
            })
        });
    }
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = initAuth;
    const meta = document.createElement("meta");
    meta.name = "google-signin-client_id";
    meta.content = clientId;
    document.head.appendChild(meta);
    document.head.appendChild(script);


});
