import Head from 'next/head';
import WizardForm from "@/components/wizardForm";


const TaxPreparerForm = () => {
    return (
        <>
            <Head>
                <title>Tax Preparer Form</title>
                <meta name="description" content="Complete the tax preparer form in 3 easy steps." />
            </Head>
            <div>
                <WizardForm />
            </div>
        </>
    );
};

export default TaxPreparerForm;
