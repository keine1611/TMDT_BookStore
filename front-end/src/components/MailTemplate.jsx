import {
    Body,
    Container,
    Column,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";


export const MailTemplate = ({ user, orderItem, order }) => {



    if (user && orderItem.length > 0)
        return (<Html>
            <Head />
            <Preview>FLOWER BOOK STORE</Preview>

            <Body style={main}>
                <Container style={container}>
                    <Section>
                        <Row>
                            <Column>
                                <Img
                                    src={'https://i.imgur.com/vIuqsai.png'}
                                    width="42"
                                    height="42"
                                    alt="shop logo"
                                />
                            </Column>

                            <Column align="center" style={tableCell}>
                                <Text style={heading}>ORDER CONFIRMATION</Text>
                            </Column>
                        </Row>
                    </Section>
                    <Section>
                        <Text style={cupomText}>       Save 3% on all your book purchases with cuppon.
                        </Text>
                    </Section>
                    <Section style={informationTable}>
                        <Row style={informationTableRow}>
                            <Column colSpan={2}>
                                <Section>
                                    <Row>
                                        <Column style={informationTableColumn}>
                                            <Text style={informationTableLabel}>EMAIL</Text>
                                            <Link
                                                style={{
                                                    ...informationTableValue,
                                                    color: "#15c",
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                {user.email}
                                            </Link>
                                        </Column>
                                    </Row>

                                    <Row>
                                        <Column style={informationTableColumn}>
                                            <Text style={informationTableLabel}>DATE ORDER   </Text>
                                            <Text style={informationTableValue}>{order.orderAt.toLocaleString()}</Text>
                                        </Column>
                                    </Row>

                                    <Row>
                                        <Column style={informationTableColumn}>
                                            <Text style={informationTableLabel}>ORDER ID</Text>
                                            <Link
                                                style={{
                                                    ...informationTableValue,
                                                    color: "#15c",
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                {order.id}
                                            </Link>
                                        </Column>
                                        <Column style={informationTableColumn}>
                                            <Text style={informationTableLabel}>PHONE NUMBER</Text>
                                            <Text style={informationTableValue}>{user.phone}</Text>
                                        </Column>
                                    </Row>
                                </Section>
                            </Column>
                            <Column style={informationTableColumn} colSpan={2}>
                                <Text style={informationTableLabel}>BILLED TO</Text>
                                <Text style={informationTableValue}>
                                </Text>
                                <Text style={informationTableValue}>{user.address}</Text>
                                {/* <Text style={informationTableValue}>2125 Chestnut St</Text>
                <Text style={informationTableValue}>San Francisco, CA 94123</Text>
                <Text style={informationTableValue}>USA</Text> */}
                            </Column>
                        </Row>
                    </Section>
                    <Section style={productTitleTable}>
                        <Text style={productsTitle}>FLOWER BOOK STORE</Text>
                    </Section>
                    <Section>
                        {orderItem.map(book => {
                            return (
                                <Row>
                                    <Column style={{ width: "64px" }}>
                                        <Img
                                            src={book.book.book_image}
                                            width="64"
                                            height="64"
                                            alt="product_img"
                                            style={productIcon}
                                        />
                                    </Column>
                                    <Column style={{ paddingLeft: "22px" }}>
                                        <Text style={productTitle}>{book.book.book_name}</Text>
                                        <Text style={productDescription}>{book.book.author.author_name}</Text>
                                        <Text style={productDescription}>{book.book.category.category_name}</Text>
                                        <Link
                                            href="https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc=us&amp;id=1497977514&amp;o=i&amp;type=Subscription%20Renewal"
                                            style={productLink}
                                            data-saferedirecturl="https://www.google.com/url?q=https://userpub.itunes.apple.com/WebObjects/MZUserPublishing.woa/wa/addUserReview?cc%3Dus%26id%3D1497977514%26o%3Di%26type%3DSubscription%2520Renewal&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw2DFCLKMo1snS-Swk5H26Z1"
                                        >
                                            Write a Review
                                        </Link>
                                        <span style={divisor}>|</span>
                                        <Link
                                            href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a=1497977514&amp;cc=us&amp;d=683263808&amp;o=i&amp;p=29065684906671&amp;pli=29092219632071&amp;s=1"
                                            style={productLink}
                                            data-saferedirecturl="https://www.google.com/url?q=https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/reportAProblem?a%3D1497977514%26cc%3Dus%26d%3D683263808%26o%3Di%26p%3D29065684906671%26pli%3D29092219632071%26s%3D1&amp;source=gmail&amp;ust=1673963081204000&amp;usg=AOvVaw3y47L06B2LTrL6qsmaW2Hq"
                                        >
                                            Report a Problem
                                        </Link>
                                    </Column>

                                    <Column style={productPriceWrapper} align="right">
                                        <Text style={productPrice}>{book.book.book_price.toLocaleString()} VNĐ</Text>
                                    </Column>
                                </Row>
                            )
                        })}

                    </Section>
                    <Hr style={productPriceLine} />
                    <Section align="right">
                        <Row>
                            <Column style={tableCell} align="right">
                                <Text style={productPriceTotal}>TOTAL</Text>
                            </Column>
                            <Column style={productPriceVerticalLine}></Column>
                            <Column style={productPriceLargeWrapper}>
                                <Text style={productPriceLarge}>{order.subtotal.toLocaleString()} VNĐ</Text>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={productPriceLineBottom} />
                    <Section>
                        <Row>
                            <Column align="center" style={block}>
                                <Img
                                    src={'https://i.imgur.com/vIuqsai.png'}
                                    width="60"
                                    height="17"
                                    alt="Apple Card"
                                />
                            </Column>
                        </Row>
                    </Section>
                    <Section>
                        <Row>
                            <Column align="center" style={ctaTitle}>
                                <Text style={ctaText}>Save 3% on all your Books purchases.</Text>
                            </Column>
                        </Row>
                    </Section>
                    <Section>
                        <Row>
                            <Column align="center" style={walletWrapper}>
                                <Link
                                    href="https://wallet.apple.com/apple-card/setup/feature/ccs?referrer=cid%3Dapy-120-100003"
                                    style={walletLink}
                                >
                                    <Img
                                        src={'https://i.imgur.com/vIuqsai.png'}
                                        width="28"
                                        height="28"
                                        alt="Apple Wallet"
                                        style={walletImage}
                                    />
                                    <span style={walletLinkText}>Apply and use in minutes</span>
                                </Link>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={walletBottomLine} />
                    <Text style={footerText}>
                        1. 3% savings is earned as Daily Cash and is transferred to your Apple
                        Cash card when transactions post to your account. If you do
                        not have an card, Daily Cash can be applied by you as a
                        credit on your statement balance. 3% is the total amount of Daily Cash
                        earned for these purchases. See the Apple Card Customer Agreement for
                        more details on Daily Cash and qualifying transactions.
                    </Text>
                    <Text style={footerText}>2. Subject to credit approval.</Text>
                    <Text style={footerText}>
                        To access and use all the features of Card, you must add
                        Card to Wallet.
                    </Text>
                    <Text style={footerText}>
                        Available for qualifying applicants in the Vietnamese.
                    </Text>
                    <Text style={footerText}>
                        ....
                    </Text>
                    <Text style={footerText}>
                        Call me: 0898 888 999
                    </Text>
                    <Text style={footerTextCenter}>
                        Privacy: We use a
                        <Link href="http://support.apple.com/kb/HT207233" style={footerLink}>
                            {" "}
                            Subscriber ID{" "}
                        </Link>
                        to provide reports to developers.
                    </Text>
                    <Text style={footerTextCenter}>
                        Get help with subscriptions and purchases.
                        <Link
                            href="https://support.apple.com/billing?cid=email_receipt"
                            style={footerLink}
                        >
                            Visit Support.
                        </Link>
                    </Text>

                    <Text style={footerTextCenter}>
                        {" "}
                        You have the option to stop receiving email receipts for your
                        subscription renewals. If you have opted out, you can still view your
                        receipts in your account under Purchase History. To manage receipts or
                        to opt in again, go to{" "}
                        <Link href="https://finance-app.itunes.apple.com/account/subscriptions?unsupportedRedirectUrl=https://apps.apple.com/US/invoice">
                            Account Settings.
                        </Link>
                    </Text>
                    <Section>
                        <Row>
                            <Column align="center" style={footerIcon}>
                                <Img
                                    src="https://i.imgur.com/vIuqsai.png"
                                    width="26"
                                    height="26"
                                    alt="Apple Card"
                                />
                            </Column>
                        </Row>
                    </Section>
                    <Text style={footerLinksWrapper}>
                        <Link href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/accountSummary?mt=8">
                            Account Settings
                        </Link>{" "}
                        •{" "}
                        <Link href="https://www.apple.com/legal/itunes/us/sales.html">
                            Terms of Sale
                        </Link>{" "}
                        •{" "}
                        <Link href="https://www.apple.com/legal/privacy/">
                            Privacy Policy{" "}
                        </Link>
                    </Text>
                    <Text style={footerCopyright}>
                        Copyright © 2023 Apple Inc. <br />{" "}
                        <Link href="https://www.apple.com/legal/">All rights reserved</Link>
                    </Text>
                </Container>
            </Body>
        </Html>)

}

export default MailTemplate;

const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: "#ffffff",
};

const resetText = {
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "660px",
    maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
    fontSize: "32px",
    fontWeight: "300",
    color: "#888888",
};

const cupomText = {
    textAlign: "center",
    margin: "36px 0 40px 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#111111",
};

const supStyle = {
    fontWeight: "300",
};

const informationTable = {
    borderCollapse: "collapse",
    borderSpacing: "0px",
    color: "rgb(51,51,51)",
    backgroundColor: "rgb(250,250,250)",
    borderRadius: "3px",
    fontSize: "12px",
};

const informationTableRow = {
    height: "46px",
};

const informationTableColumn = {
    paddingLeft: "20px",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: "0px 1px 1px 0px",
    height: "44px",
};

const informationTableLabel = {
    ...resetText,
    color: "rgb(102,102,102)",
    fontSize: "10px",
};

const informationTableValue = {
    fontSize: "12px",
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
};

const productTitleTable = {
    ...informationTable,
    margin: "30px 0 15px 0",
    height: "24px",
};

const productsTitle = {
    background: "#fafafa",
    paddingLeft: "10px",
    fontSize: "14px",
    fontWeight: "500",
    margin: "0",
};

const productIcon = {
    margin: "0 0 0 20px",
    borderRadius: "14px",
    border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    ...resetText,
};

const productLink = {
    fontSize: "12px",
    color: "rgb(0,112,201)",
    textDecoration: "none",
};

const divisor = {
    marginLeft: "4px",
    marginRight: "4px",
    color: "rgb(51,51,51)",
    fontWeight: 200,
};

const productPriceTotal = {
    margin: "0",
    color: "rgb(102,102,102)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "0px 30px 0px 0px",
    textAlign: "right",
};

const productPrice = {
    fontSize: "12px",
    fontWeight: "600",
    margin: "0",
};

const productPriceLarge = {
    margin: "0px 20px 0px 0px",
    fontSize: "16px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    textAlign: "right",
};

const productPriceWrapper = {
    display: "table-cell",
    padding: "0px 20px 0px 0px",
    width: "100px",
    verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
    height: "48px",
    borderLeft: "1px solid",
    borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const block = { display: "block" };

const ctaTitle = {
    display: "block",
    margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

const walletImage = {
    display: "inherit",
    paddingRight: "8px",
    verticalAlign: "middle",
};

const walletBottomLine = { margin: "65px 0 20px 0" };

const footerText = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    margin: "0",
    lineHeight: "auto",
    marginBottom: "16px",
};

const footerTextCenter = {
    fontSize: "12px",
    color: "rgb(102,102,102)",
    margin: "20px 0",
    lineHeight: "auto",
    textAlign: "center",
};

const footerLink = { color: "rgb(0,115,255)" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
    margin: "8px 0 0 0",
    textAlign: "center",
    fontSize: "12px",
    color: "rgb(102,102,102)",
};

const footerCopyright = {
    margin: "25px 0 0 0",
    textAlign: "center",
    fontSize: "12px",
    color: "rgb(102,102,102)",
};

const walletLinkText = {
    fontSize: "14px",
    fontWeight: "400",
    textDecoration: "none",
};
