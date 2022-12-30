const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/wellfare/",
  twitter: "https://twitter.com/wwwellfare",
  github: "https://github.com/wellfarees/wellfare",
};

const FOOTER_SOCIAL = `
<tr>
<td class="social-col">
    <a href="${SOCIAL_LINKS.twitter}">
    <img
        src="https://img.icons8.com/ios-glyphs/512/twitter.png"
        alt="Twitter"
        title="Twitter"
    />
    </a>
</td>
<td class="social-col">
    <a href="${SOCIAL_LINKS.instagram}">
    <img
        src="https://img.icons8.com/ios-glyphs/512/instagram-new.png"
        alt="Instagram"
        title="Instagram"
    />
    </a>
</td>
<td class="social-col">
    <a href="${SOCIAL_LINKS.github}">
    <img
        src="https://img.icons8.com/ios-glyphs/512/github.png"
        alt="Github"
        title="Github"
    />
    </a>
</td>
</tr>
`;

export const welcomeEmail = (
  name: string,
  link: string,
  unsubLink: string
): string => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

  <style>
    body {
      margin: 0;
      padding: 0;
    }

    table {
      border-spacing: 0;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f0f0f0;
      min-height: 100vh;
    }

    .main {
      background-color: #fafafa;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      padding: 0;
      width: 600px !important;
    }

    .two-cols .col:not(.image) {
      width: 100%;
      max-width: 50%;
      display: inline-block;
      vertical-align: top;
    }

    .image {
      max-width: 170px;
      padding: 30px;
      padding-bottom: 0;
      display: inline-block;
    }

    .welcoming {
      padding-top: 70px;
      margin-left: 30px;
    }

    .welcoming p {
      line-height: 0;
      padding-bottom: 3px;
    }

    .welcome-text {
      width: 450px;
      display: inline-block;
      text-align: left;
      line-height: 1.3;
      padding: 0 60px;
    }

    .verify {
      padding: 60px;
      padding-top: 30px;
      display: inline-block;
      padding-bottom: 50px;
    }

    .verify a.verify-btn {
      background: linear-gradient(226.57deg, #117ee3 14.76%, #00f0ff 134.26%);
      box-shadow: 0px 0px 7px 1px rgba(9, 180, 240, 0.32);
      border-radius: 7px;
      text-decoration: none;
      color: #fff;
      padding: 7px 70px;
      display: inline-block;
    }

    .verify p {
      color: #a8a5a5;
      font-weight: bold;
      font-size: 14px;
      margin-top: 30px;
    }

    .verify a.verification-link {
      font-size: 14px;
      color: #b8bcc7;
      font-weight: 400;
      display: inline-block;
      max-width: 450px;
      word-wrap: break-word;
      line-height: 1.5;
    }

    .warning {
      padding: 0px 60px;
      padding-bottom: 40px;
      display: inline-block;
    }

    .warning h2 {
      font-size: 18px;
      font-weight: bold;
      line-height: 0;
    }

    .warning p {
      font-size: 14px;
      display: inline-block;
      width: 440px;
      line-height: 1.5;
    }

    .footer {
      background-color: #f5f5f5;
      margin: 0 auto;
      width: 100%;
      display: inline-block;
      max-width: 600px;
      padding: 30px 60px;
    }

    .footer p {
      display: inline-block;
      width: 300px;
    }

    .left-side {
      max-width: 300px !important;
      padding: 30px;
      padding-bottom: 0;
    }

    .footer p.thanks {
      line-height: 1.5;
      margin-bottom: 0;
    }

    .footer .social {
      padding-top: 6px;
      display: inline-block;
    }

    .footer .col {
      display: inline-block;
    }

    .footer .unsub {
      font-size: 14px;
      color: #9a9a9a;
      width: 400px;
      line-height: 1.4;
      display: inline-block;
      padding-top: 10px;
    }

    .footer .unsub a {
      color: #9a9a9a;
      font-weight: bold;
    }

    .footer .social-col {
      width: 50px;
    }

    .footer .social-col img {
      width: 20px;
    }

    .footer .col.first {
      width: 65% !important;
    }
  </style>
  
  </head>

  <body>
    <main class="wrapper">
      <table class="main" width="100%">
        <!-- Header -->

        <tr>
          <td>
            <table width="100%">
              <tr class="top">
                <!-- Two columns -->
                <td class="two-cols">
                  <table class="col image">
                    <tr>
                      <td>
                        <!-- Image on the left -->
                        <a href="#">
                          <img
                            src="https://i.imgur.com/E3WCtPM.png"
                            alt="Meditation illustration"
                            title="Meditation illustration"
                            width="165"
                          />
                        </a>
                      </td>
                    </tr>
                  </table>
                  <table class="col welcoming">
                    <tr>
                      <td>
                        <p style="font-size: 16px">Welcome to</p>
                        <img
                          width="120"
                          src="https://i.imgur.com/cLHaSw7.png"
                          alt="Wellfare logo"
                          title="Wellfare logo"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="welcome-text">
                <td>
                  <p>
                    Thanks so much for joining Wellfare, <b>${name}</b>! We are
                    excited for you to experience the benefits of using our
                    journaling system.
                  </p>
                </td>
              </tr>

              <tr class="verify">
                <td>
                  <a class="verify-btn" href="#">Verify</a>
                  <p>Your verification link:</p>
                  <a href="${link}" class="verification-link"
                    ${link}
                  >
                </td>
              </tr>

              <tr class="warning">
                <td>
                  <h2>This isn't you?</h2>
                  <p>
                    If you did not sign up on Wellfare, under no circumstances
                    should you follow the link above, since it will grant the
                    person who signed up access to to their account with this
                    email connected.
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <table class="footer">
                    <tr>
                      <td class="col first">
                        <p class="thanks">
                          Thank you for choosing us, <br />
                          <b>Wellfare</b>
                        </p>
                      </td>
                      <td class="col social">
                        <table class="icons">
                        ${FOOTER_SOCIAL}
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="unsub">
                          When signing up, you have been automatically added to
                          our newsletter. <a href="${unsubLink}">Click here</a> to
                          unsubscribe.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </main>
  </body>
</html>
`;
};

export const newsletterEmail = (unsubLink: string): string => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <style>
    body {
      margin: 0;
      padding: 0;
    }

    table {
      border-spacing: 0;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f0f0f0;
      min-height: 100vh;
    }

    .main {
      background-color: #fafafa;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      padding: 0;
      width: 600px !important;
    }

    .two-cols .col:not(.image) {
      width: 100%;
      max-width: 50%;
      display: inline-block;
      vertical-align: top;
    }

    .image {
      max-width: 170px;
      padding: 30px;
      padding-bottom: 0;
      display: inline-block;
    }

    .welcoming {
      padding-top: 50px;
      margin-left: 30px;
    }

    .welcoming p {
      line-height: 0;
    }

    .welcoming h2 {
      line-height: 0;
    }

    .welcome-text {
      width: 450px;
      display: inline-block;
      text-align: left;
      line-height: 1.3;
      padding: 0 60px;
    }

    .warning {
      padding: 0px 60px;
      padding-top: 20px;
      padding-bottom: 40px;
      display: inline-block;
    }

    .warning h2 {
      font-size: 18px;
      font-weight: bold;
      line-height: 0;
    }

    .warning p {
      font-size: 14px;
      display: inline-block;
      width: 440px;
      line-height: 1.5;
    }

    .footer {
      background-color: #f5f5f5;
      margin: 0 auto;
      width: 100%;
      display: inline-block;
      max-width: 600px;
      padding: 30px 60px;
    }

    .footer p {
      display: inline-block;
      width: 300px;
    }

    .left-side {
      max-width: 300px !important;
      padding: 30px;
      padding-bottom: 0;
    }

    .footer p.thanks {
      line-height: 1.5;
      margin-bottom: 0;
    }

    .footer .social {
      padding-top: 6px;
      display: inline-block;
    }

    .footer .col {
      display: inline-block;
    }

    .footer .unsub {
      font-size: 14px;
      color: #9a9a9a;
      width: 400px;
      line-height: 1.4;
      display: inline-block;
      padding-top: 10px;
    }

    .footer .unsub a {
      color: #9a9a9a;
      font-weight: bold;
    }

    .footer .social-col {
      width: 50px;
    }

    .footer .social-col img {
      width: 20px;
    }

    .footer .col.first {
      width: 65% !important;
    }
  </style>

  <body>
    <main class="wrapper">
      <table class="main" width="100%">
        <!-- Header -->

        <tr>
          <td>
            <table width="100%">
              <tr class="top">
                <!-- Two columns -->
                <td class="two-cols">
                  <table class="col image">
                    <tr>
                      <td>
                        <!-- Image on the left -->
                        <a href="#">
                          <img
                            src="https://i.imgur.com/E3WCtPM.png"
                            alt="Meditation illustration"
                            title="Meditation illustration"
                            width="165"
                          />
                        </a>
                      </td>
                    </tr>
                  </table>
                  <table class="col welcoming">
                    <tr>
                      <td>
                        <img
                          src="https://i.imgur.com/Sz5aTpW.png"
                          alt="Newsletter logo"
                          title="Newsletter logo"
                          width="160"
                        />
                        <p>You’ve subscribed to the latest news</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="welcome-text">
                <td>
                  <p>
                    We appreciate your interest in our newsletter. We will be
                    sending out our quality articles and keep you posted with
                    anything that would benefit you.
                  </p>
                </td>
              </tr>

              <tr class="warning">
                <td>
                  <h2>This wasn't you?</h2>
                  <p>
                    If you did not sign up for the Wellfare newsletter, you can
                    unsubscribe by following the link in the footer.
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <table class="footer">
                    <tr>
                      <td class="col first">
                        <p class="thanks">
                          Thank you for choosing us, <br />
                          <b>Wellfare</b>
                        </p>
                      </td>
                      <td class="col social">
                        <table class="icons">
                        ${FOOTER_SOCIAL}
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="unsub">
                          You can always <a href="${unsubLink}">click here</a> if you wish
                          to unsubscribe from our newsletter.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </main>
  </body>
</html>

    `;
};

export const resetPasswordEmail = (
  email: string,
  link: string,
  unsubLink: string
): string => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <style>
    body {
      margin: 0;
      padding: 0;
    }

    table {
      border-spacing: 0;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f0f0f0;
      min-height: 100vh;
    }

    .main {
      background-color: #fafafa;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
      padding: 0;
      width: 600px !important;
    }

    .two-cols .col:not(.image) {
      width: 100%;
      max-width: 50%;
      display: inline-block;
      vertical-align: top;
    }

    .image {
      max-width: 170px;
      padding: 30px;
      padding-bottom: 0;
      display: inline-block;
    }

    .welcoming {
      padding-top: 60px;
      margin-left: 30px;
    }

    .welcoming h2 {
      line-height: 0;
    }

    .welcome-text {
      width: 450px;
      display: inline-block;
      text-align: left;
      line-height: 1.3;
      padding: 0 60px;
    }

    .reset {
      padding: 60px;
      padding-top: 30px;
      display: inline-block;
      padding-bottom: 50px;
    }

    .reset a.reset-btn {
      background: linear-gradient(226.57deg, #117ee3 14.76%, #00f0ff 134.26%);
      box-shadow: 0px 0px 7px 1px rgba(9, 180, 240, 0.32);
      border-radius: 7px;
      text-decoration: none;
      color: #fff;
      padding: 7px 70px;
      display: inline-block;
    }

    .reset p {
      color: #a8a5a5;
      font-weight: bold;
      font-size: 14px;
      margin-top: 30px;
    }

    .reset a.reset-link {
      font-size: 14px;
      color: #b8bcc7;
      font-weight: 400;
      display: inline-block;
      max-width: 450px;
      word-wrap: break-word;
      line-height: 1.5;
    }

    .warning {
      padding: 0px 60px;
      padding-bottom: 40px;
      display: inline-block;
    }

    .warning h2 {
      font-size: 18px;
      font-weight: bold;
      line-height: 0;
    }

    .warning p {
      font-size: 14px;
      display: inline-block;
      width: 440px;
      line-height: 1.5;
    }

    .footer {
      background-color: #f5f5f5;
      margin: 0 auto;
      width: 100%;
      display: inline-block;
      max-width: 600px;
      padding: 30px 60px;
    }

    .footer p {
      display: inline-block;
      width: 300px;
    }

    .left-side {
      max-width: 300px !important;
      padding: 30px;
      padding-bottom: 0;
    }

    .footer p.thanks {
      line-height: 1.5;
      margin-bottom: 0;
    }

    .footer .social {
      padding-top: 6px;
      display: inline-block;
    }

    .footer .col {
      display: inline-block;
    }

    .footer .unsub {
      font-size: 14px;
      color: #9a9a9a;
      width: 400px;
      line-height: 1.4;
      display: inline-block;
      padding-top: 10px;
    }

    .footer .unsub a {
      color: #9a9a9a;
      font-weight: bold;
    }

    .footer .social-col {
      width: 50px;
    }

    .footer .social-col img {
      width: 20px;
    }

    .footer .col.first {
      width: 65% !important;
    }
  </style>

  <body>
    <main class="wrapper">
      <table class="main" width="100%">
        <!-- Header -->

        <tr>
          <td>
            <table width="100%">
              <tr class="top">
                <!-- Two columns -->
                <td class="two-cols">
                  <table class="col image">
                    <tr>
                      <td>
                        <!-- Image on the left -->
                        <a href="#">
                          <img
                            src="https://i.imgur.com/E3WCtPM.png"
                            alt="Meditation illustration"
                            title="Meditation illustration"
                            width="165"
                          />
                        </a>
                      </td>
                    </tr>
                  </table>
                  <table class="col welcoming">
                    <tr>
                      <td>
                        <img
                          src="https://i.imgur.com/VoRtjRY.png"
                          alt="Wellfare logo"
                          title="Wellfare logo"
                        />
                        <p style="font-size: 16px">Reset your password</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="welcome-text">
                <td>
                  <p>
                    We were issued a request to reset the password for the
                    account registered on the email
                    <b>${email}</b>. To reset your password,
                    click the button or follow the link below.
                  </p>
                </td>
              </tr>

              <tr class="reset">
                <td>
                  <a class="reset-btn" href="${link}">Reset</a>
                  <p>Your password reset link:</p>
                  <a href="${link}" class="reset-link">${link}</a>
                </td>
              </tr>

              <tr class="warning">
                <td>
                  <h2>This wasn't you?</h2>
                  <p>
                    If you did not issue this password reset link, under no
                    circumstances should you click the button or click on the
                    link provided above. This would grant the user access to the
                    Wellfare account registred on this email.
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <table class="footer">
                    <tr>
                      <td class="col first">
                        <p class="thanks">
                          Thank you for choosing us, <br />
                          <b>Wellfare</b>
                        </p>
                      </td>
                      <td class="col social">
                        <table class="icons">
                        ${FOOTER_SOCIAL}
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="unsub">
                          When signing up, you have been automatically added to
                          our newsletter. <a href="${unsubLink}">Click here</a> to
                          unsubscribe.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </main>
  </body>
</html>

    `;
};
