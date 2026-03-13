export const Verification_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Email</title>

<style>
body{
  margin:0;
  padding:0;
  background:#0b1120;
  font-family: Inter, Arial, sans-serif;
}

.wrapper{
  width:100%;
  padding:40px 20px;
}

.container{
  max-width:600px;
  margin:auto;
  background:#0f172a;
  border-radius:12px;
  border:1px solid rgba(255,255,255,0.08);
  box-shadow:0 10px 40px rgba(0,0,0,0.6);
  overflow:hidden;
}

.header{
  padding:30px;
  text-align:center;
  border-bottom:1px solid rgba(255,255,255,0.05);
}

.logo{
  font-size:22px;
  font-weight:600;
  color:white;
}

.tagline{
  font-size:13px;
  color:#94a3b8;
}

.content{
  padding:40px;
  color:#cbd5f5;
  line-height:1.7;
}

.title{
  font-size:22px;
  color:white;
  margin-bottom:20px;
}

.code-box{
  margin:30px 0;
  padding:18px;
  text-align:center;
  font-size:28px;
  letter-spacing:6px;
  font-weight:bold;
  color:#60a5fa;
  background:#020617;
  border-radius:10px;
  border:1px dashed #3b82f6;
}

.footer{
  text-align:center;
  padding:20px;
  font-size:12px;
  color:#64748b;
  border-top:1px solid rgba(255,255,255,0.05);
}

</style>
</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">
<div class="logo">Talk To Your Docs</div>
<div class="tagline">Turn documents into AI knowledge</div>
</div>

<div class="content">

<div class="title">Verify your email</div>

<p>
Thanks for signing up! To complete your registration,
enter the verification code below.
</p>

<div class="code-box">{verificationCode}</div>

<p>
This code will expire shortly.  
If you didn't create an account, you can safely ignore this email.
</p>

</div>

<div class="footer">
© ${new Date().getFullYear()} Talk To Your Docs • All rights reserved
</div>

</div>

</div>

</body>
</html>
`;

export const Welcome_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome</title>

<style>

body{
  margin:0;
  padding:0;
  background:#0b1120;
  font-family: Inter, Arial, sans-serif;
}

.wrapper{
  width:100%;
  padding:40px 20px;
}

.container{
  max-width:600px;
  margin:auto;
  background:#0f172a;
  border-radius:12px;
  border:1px solid rgba(255,255,255,0.08);
  box-shadow:0 10px 40px rgba(0,0,0,0.6);
  overflow:hidden;
}

.header{
  padding:30px;
  text-align:center;
  border-bottom:1px solid rgba(255,255,255,0.05);
}

.logo{
  font-size:22px;
  font-weight:600;
  color:white;
}

.tagline{
  font-size:13px;
  color:#94a3b8;
}

.content{
  padding:40px;
  color:#cbd5f5;
  line-height:1.7;
}

.title{
  font-size:24px;
  color:white;
  margin-bottom:15px;
}

.button{
  display:inline-block;
  padding:14px 28px;
  margin-top:25px;
  background:linear-gradient(135deg,#3b82f6,#6366f1);
  color:white;
  text-decoration:none;
  border-radius:8px;
  font-weight:600;
  font-size:15px;
}

.features{
  margin-top:25px;
  padding-left:18px;
}

.features li{
  margin-bottom:10px;
}

.footer{
  text-align:center;
  padding:20px;
  font-size:12px;
  color:#64748b;
  border-top:1px solid rgba(255,255,255,0.05);
}

</style>
</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">
<div class="logo">Talk To Your Docs</div>
<div class="tagline">Turn documents into AI knowledge</div>
</div>

<div class="content">

<div class="title">Welcome {name} 👋</div>

<p>
Your account has been successfully created.
You're now ready to transform your documents
into an interactive AI knowledge base.
</p>

<p>Here are a few things you can do:</p>

<ul class="features">
<li>Upload PDFs, research papers, or documentation</li>
<li>Create AI searchable knowledge bases</li>
<li>Ask questions and get contextual answers instantly</li>
</ul>

<a href="#" class="button">Open Dashboard</a>

<p style="margin-top:30px">
If you need help getting started, our support team is always here.
</p>

</div>

<div class="footer">
© ${new Date().getFullYear()} Talk To Your Docs • All rights reserved
</div>

</div>

</div>

</body>
</html>
`;