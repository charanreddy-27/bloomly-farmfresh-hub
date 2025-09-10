import { Card, CardContent } from "@/components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
              PRIVACY POLICY
            </h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <div className="text-justify leading-relaxed space-y-4">
                <p>
                  <strong>BLOOMLY PLATFORMS INDIA PRIVATE LIMITED</strong> ("Company", "We", "Us", or "Our"), a company incorporated under the Companies Act, 2013, with its registered office at Salarpuria Sattva Magnificia,
78, Old Madras Rd, Mahadevapura, Bangalore - 560016, India which owns and operates the website{" "}
                  <a href="https://bloomly-farmfresh-hub.com" className="text-green-600 hover:underline">
                    https://bloomly-farmfresh-hub.com
                  </a>{" "}
                  (referred to as "Platform") is committed to protecting your ("Your" or "You", as applicable) privacy and the information that You share while using the Platform. We value the trust You place in Us. That's why, We maintain reasonable security standards for securing the transactions and Your information.
                </p>

                <p>
                  This privacy policy ("Privacy Policy") specifies the manner in which personal data and other information is collected, received, stored, processed, disclosed, transferred, dealt with or otherwise handled by the Company (collectively referred to as "Process(ed)"). This Privacy Policy does not apply to information that You provide to, or that is collected by, any third-party through the Platform, and any Third-Party Sites (defined hereinafter) that You access or use in connection with the Services (defined hereinafter) offered on the Platform.
                </p>

                <p>
                  Please read the Privacy Policy carefully prior to using the Platform or accessing any material, information available on the Platform including marketplace services for fresh produce trading and agricultural connections ("Platform Services").
                </p>

                <p>
                  By visiting the Platform or using the Platform Services, You accept and agree to be bound by the terms and conditions of the Privacy Policy as well as Our Terms of Use ("Terms"), which are incorporated herein by reference.
                </p>

                <p>
                  This Privacy Policy will be considered to be an electronic record under the Indian data privacy laws including the Information Technology Act, 2000 read with rules and regulations made thereunder and will not require any physical, electronic, or digital signature by the Company or by You.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Collection of Information:</h2>
                <p className="mb-4">
                  We collect Personal Information from You when You use the Platform and while You access the Platform Services.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-green-600">Information You give Us:</h3>
                <p className="mb-4">
                  You may provide certain information to Us voluntarily while using Our Platform for availing the Services, such as your name, phone number, email address, and business contact details.
                </p>
                <p className="mb-4">
                  In order to facilitate transactions on the Platform, You may share financial information such as Your card details and bank account details.
                </p>
                <p className="mb-4">
                  The above information is collectively referred to as ("Personal Information"). In certain cases, the above information may be shared by You with the Company through the Platform to access the Platform Services.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-green-600">Information collected from third parties:</h3>
                <p className="mb-4">
                  We may also access Your telecom account, that You may have with Your telecom provider. From Your telecom account, We collect information such as your name, address, amount of bills paid by You, activation date, handset details. We collect such data from Your telecom operator for the purpose of verification of your identity and for profiling purpose.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-green-600">Location based information:</h3>
                <p className="mb-4">
                  When You access and use the Platform through Your web browser, We may receive information about Your location and Your IP address. We may use this information to provide You with location-based features including but not limited to search results and other personalized content.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-green-600">Information collected through Platform usage:</h3>
                <p className="mb-4">
                  When You use the Platform for marketplace activities, we shall collect and store information related to your platform usage, which may include details of inquiries made, product searches, marketplace interactions, etc. When You use the Platform for connecting with other users, we shall collect and store the details of such interactions.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Processing of Information:</h2>
                <p className="mb-4">We Process Your Information for the following purposes:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>to provide and improve the Platform features that You request</li>
                  <li>to facilitate connections between users on the Platform</li>
                  <li>to enhance Your experience by providing You with relevant suggestions</li>
                  <li>to resolve disputes and troubleshoot problems</li>
                  <li>to help promote a safe Platform and protect the security and integrity of the Platform and the users</li>
                  <li>to detect, prevent and protect Us and You from any errors, fraud and other criminal or prohibited activity on the Platform</li>
                  <li>to enforce and inform about our terms and conditions</li>
                  <li>to respond to Your comments, and queries on the Platform</li>
                  <li>for contact point verification to confirm your place of residence or business</li>
                  <li>for any other purpose after obtaining Your consent at the time of collection</li>
                </ul>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Sharing of Information:</h2>
                <p className="mb-4">
                  We may also disclose Your Personal Information (such as name, date of birth, contact and address details, etc.), to the extent necessary, to Our group entities, third party vendors, advisors, other service providers who work for the Company and are bound by contractual obligations to keep such Information confidential and use it only for the purposes for which We disclose it to them.
                </p>
                <p className="mb-4">
                  The Company may disclose Your information, to the extent necessary: (i) to comply with laws and to respond to lawful requests and legal process, (ii) to protect the rights and property of the Company, Our users, and others, including to enforce the Terms, and (iii) in an emergency to protect the personal safety and assets of the Company, the users, or any person.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Security Precautions and Measures:</h2>
                <p className="mb-4">
                  Our Platform has adopted all reasonable security measures and safeguards to protect Your privacy and Personal Information from loss, misuse, unauthorized access, disclosure, destruction, and alteration of the information in compliance with applicable laws.
                </p>
                <p className="mb-4">
                  When payment information is being transmitted on or through the Platform (if any), it will be protected by encryption technology. You expressly consent to the sharing of Your information with third party service providers, including payment gateways, to process payments and manage your payment-related information.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Policy Towards Children:</h2>
                <p className="mb-4">
                  The Platform is intended for a general audience and not for use by anyone younger than the age of 18. The Company does not knowingly Process Personal Information of children younger than the age of 18 without the consent of a parent or legal guardian; if the Company learns that it has done so, the Company will promptly remove the information from all active databases. If you are a parent or legal guardian who believes that the Company has Processed their child's Personal Information, please contact the Company at operations@bloomly.co.in.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Your Consent and Changes to Privacy Policy:</h2>
                
                <h3 className="text-xl font-semibold mb-3 text-green-600">Withdrawal of consent:</h3>
                <p className="mb-4">
                  You may choose to withdraw Your consent provided hereunder at any point in time. Such withdrawal of the consent must be sent in writing to Operations@bloomly.co.in. In case You do not provide Your consent or later withdraw Your consent, We request you not to access the Platform and/or use the Platform Services and We also reserve the right to not provide You access to the Platform.
                </p>

                <h3 className="text-xl font-semibold mb-3 text-green-600">Changes To Our Privacy Policy:</h3>
                <p className="mb-4">
                  We reserve the unconditional right to change, modify, add, or remove portions of this Privacy Policy at any time. While we will intimate you whenever we make material changes to our Privacy Policy, Your continued use and access of the Platform shall signify Your acceptance of the amended Privacy Policy.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-700">Questions:</h2>
                <p className="mb-4">
                  Please feel free to contact us at{" "}
                  <a href="mailto:Operations@bloomly.co.in" className="text-green-600 hover:underline">
                    Operations@bloomly.co.in
                  </a>{" "}
                  regarding any questions on the Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
