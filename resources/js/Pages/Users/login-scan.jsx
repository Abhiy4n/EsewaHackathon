import { useState } from "react";
import EsewaSendMoney from "./sendmoney";
import EsewaQr        from "./qrCheck";

export default function SecurityTutorialFlow({ onBack }) {
    // 'send-money' | 'scan-pay'
    const [currentStep, setCurrentStep] = useState("send-money");

    const handleGoToScanPay = () => {
        setCurrentStep("scan-pay");
    };

    const handleGoToHome = () => {
        onBack?.();
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            {currentStep === "send-money" && (
                <EsewaSendMoney
                    onCompleted={handleGoToScanPay}
                    onBack={handleGoToHome}
                />
            )}

            {currentStep === "scan-pay" && (
                <EsewaQr
                    onHome={handleGoToHome}
                />
            )}
        </div>
    );
}
