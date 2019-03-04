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
    if(options) {
        options.forEach(option => {
            script.setAttribute(option, '');
        })
    }
    document.getElementsByTagName('head')[0].appendChild(script);
    if(id === "googleAuth") {

    }
});
export const addFacebookScript = () => {
    const id = 'facebookAuth';
    const src = 'https://connect.facebook.net/en_US/sdk.js';

    return addScript(id, src);
};

export const addGooglePhotosScript = (clientId) => {
    const id = 'googleAuth';
    const src = 'https://apis.google.com/js/api.js';
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'google-signin-client_id')
    meta.setAttribute('content', clientId)
    document.getElementsByTagName('head')[0].appendChild(meta);
    return addScript(id, src, ['async', 'defer']);
};
