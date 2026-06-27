# Setup Backend
New-Item -ItemType Directory -Force -Path backend
Set-Location backend
npm init -y
npm install express pg cors dotenv jsonwebtoken bcryptjs multer multer-storage-cloudinary cloudinary
npm install -D nodemon

# Setup Frontend
Set-Location ..
npx -y create-vite frontend --template react
Set-Location frontend
npm install
npm install bootstrap react-router-dom axios react-icons aos
