let welcomeMessage =(name)=>{ 
    let msg = ` <h1>Welcome ${name} to Your To-Do App!</h1>
    <p>We're excited to have you on board! Our app is designed to help you manage your tasks more efficiently so you can focus on what matters most.</p>
    <p>Here's how our app can help you:</p>
    <ul>
        <li>Organize your tasks in one place</li>
        <li>Prioritize your tasks based on importance and urgency</li>
        <li>Set reminders and deadlines to stay on track</li>
        <li>Collaborate with others on shared tasks or projects</li>
    </ul>
    <p>With our intuitive interface and powerful features, we're confident that you'll find managing your tasks a breeze!</p>
    <p>If you have any questions or need assistance, feel free to contact us. We're here to help!</p>
    <p>Happy organizing!</p>`
    return msg;
};

module.exports = welcomeMessage;