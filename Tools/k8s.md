# Kubernetes Cert Manager
- When a virtual server is created, the cert manager creates a pod to do the ACME challenge for the SSL then creates the secret that contains the SSL certificate and key.
- If there’s basic authentication applied, certificate issuing or renewal most likely won’t succeed and result in acme challenges to fail with status code 401. You’ll need to add the following in virtual server as a server-snippet.
    
    ```bash
    location ^~ /.well-known/acme-challenge/ {
      auth_basic off;
    }
    ```
    
    - Debug or troubleshoot using `kubectl describe challenge` or inspect cert manager pod's logs.
