import {
    Html,
    Head,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification Code</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Preview>Here&apos;s your verification code: {otp}</Preview>
        <Section>
          <Row>
            <Heading as="h2" style={{ fontFamily: 'Roboto, Verdana, sans-serif' }}>
              Hello {username},
            </Heading>
          </Row>
          <Row>
            <Text style={{ fontFamily: 'Roboto, Verdana, sans-serif' }}>
              Thank you for registering. Please use the following verification code to
              complete your registration:
            </Text>
          </Row>
          <Row>
            <Text
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                fontFamily: 'Roboto, Verdana, sans-serif',
              }}
            >
              {otp}
            </Text>
          </Row>
          <Row>
            <Text style={{ fontFamily: 'Roboto, Verdana, sans-serif' }}>
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          <Row>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{
                backgroundColor: '#61dafb',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontFamily: 'Roboto, Verdana, sans-serif',
              }}
            >
              Verify Here
            </Button>
          </Row>
        </Section>
      </Html>
    );
  }
  