# Ruby Notes

- Consider using vendor directory in Ruby where its within a project's structure for cases like third-party libraries, external gems or dependencies are placed or assets (Gems, binary executably, JS/CSS libraries, etc..) (check [this](https://stackoverflow.com/questions/12573596/what-is-the-purpose-of-vendor-bundle-heroku-tells-me-to-remove-it)).
- When initiating a new environment, some times you’ll need to migrate and seed the database using `RAILS_ENV=${RAILS_ENV} bundle exec rake db:migrate` and `RAILS_ENV=${RAILS_ENV} bundle exec rake db:seed`.
- If a Ruby app has assets (or its own frontend), they’ll need to be generated using `RAILS_ENV=${RAILS_ENV} bundle exec rake assets:clean &&\ RAILS_ENV=${RAILS_ENV} bundle exec rake assets:precompile` and the assets are usually located at the `public` directory.
    - You can create a Kubernetes job in a GitOps setup for it alone and have the volume shared across the app deployment and app workers.
- `RAILS_ENV=staging bundle exec rails c` to access console, use `--sandbox` for sandbox (where queries won’t be applied to the database or any other changes).
- Example to install a specific outdated gem in Ruby in Docker.
    
    ```docker
    RUN gem install specific_install
    RUN gem specific_install https://github.com/mimemagicrb/mimemagic.git --ref 01f92d86d15d85cfd0f20dabd025dcbd36a8a60f
    ```