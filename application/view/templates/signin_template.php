
<div cache="sign_in">
    <div class='sign_in_container' form="SignInForm">
        <input type='text' name='username' id="username" maxlength='10' size='15'value="username" controller="SignInUsername"/><br />
        <input type='text' name='password' id="password" maxlength='15' size='15' value="password" controller="SignInPassword"/><br />
        <div class="crease_button submit" submit="true" link="/users/login">Sign In</div>
        <div class="crease_button" controller="CreasetophLink" link="/users/signup">Sign Up</div>
    </div>
</div>

