npm ci
npm i pm2 typescript serve -g
git clone git@github.com:icpm/personal-data.git
npm run build

cp ../dotenv/api.zijinluo.com.env .env

command="cd api.zijinluo.com && git pull && npm ci && cd personal-data && git pull && cd .. && npm run build"
job="0 0 * * * $command"
cat <(fgrep -i -v "$command" <(crontab -l)) <(echo "$job") | crontab -
