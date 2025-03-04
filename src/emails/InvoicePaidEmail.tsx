import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  
  interface InvoicePaidEmailProps {
    invoiceId: number;
  }
  
  export const InvoicePaidEmail = ({ invoiceId }: InvoicePaidEmailProps) => (
    <Html>
      <Head />
      <Preview>Payment Successful - Invoice Attached</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Payment Successful</Heading>
          <Text style={paragraph}>
            Your payment for Invoice #{invoiceId} has been successfully received.
            Please find your invoice PDF attached.
          </Text>
          <Section style={buttonContainer}>
            <Button
              style={button}
              href={`http://localhost:3000/invoices/${invoiceId}/payment`}
            >
              View Invoice
            </Button>
          </Section>
          <Hr style={hr} />
          <Link href="https://suyashinvoice.online" style={reportLink}>
            Suyash Invoice
          </Link>
        </Container>
      </Body>
    </Html>
  );
  
  InvoicePaidEmail.PreviewProps = {
    invoiceId: 1234,
  } as InvoicePaidEmailProps;
  
  export default InvoicePaidEmail;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
  };
  
  const heading = {
    fontSize: "24px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "400",
    color: "#484848",
    padding: "17px 0 0",
  };
  
  const paragraph = {
    margin: "0 0 15px",
    fontSize: "15px",
    lineHeight: "1.4",
    color: "#3c4149",
  };
  
  const buttonContainer = {
    padding: "27px 0 27px",
  };
  
  const button = {
    backgroundColor: "#5e6ad2",
    borderRadius: "3px",
    fontWeight: "600",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "11px 23px",
  };
  
  const reportLink = {
    fontSize: "14px",
    color: "#b4becc",
  };
  
  const hr = {
    borderColor: "#dfe1e4",
    margin: "42px 0 26px",
  };
  