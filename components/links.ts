import { Link } from './types';

export const links: Link[] = [
  { name: "GitHub", icon: "github.svg", url: "https://github.com/jimchen2", category: "Tech" },
  { name: "Kaggle", icon: "kaggle.svg", url: "https://www.kaggle.com/jc4214", category: "Tech" },
  { name: "Docker Hub", icon: "docker.svg", url: "https://hub.docker.com/u/jimchen2", category: "Tech" },
  { name: "Hugging Face", icon: "huggingface.svg", url: "https://huggingface.co/jimchen2", category: "Tech" },
  { name: "Email", icon: "gmail.svg", url: "mailto:jimchen4214@gmail.com", category: "Social" },
  { name: "WeChat", icon: "wechat.svg", url: "./qr_code/wechat.jpeg", isQR: true, category: "Social" },
  { name: "QQ", icon: "tencentqq.svg", url: "./qr_code/qq.jpg", isQR: true, category: "Social" },
  { name: "RSS Feed", icon: "rss.svg", url: "https://jimchen.me/api/rss", category: "Apps" },
  { name: "Homepage", icon: "nextjs.png", url: "https://jimchen.me", category: "Apps" }
];