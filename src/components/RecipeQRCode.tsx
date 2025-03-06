import { QR_CODE_DIALOG_TITLE } from "@/constants/text"
import QRCode from "react-qr-code"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import ErrorBoundary from "./ErrorBoundry";


interface Props {
  qrCode: string | null;
  setQrCode: (value: string | null) => void;
}

export const RecipeQRCode: React.FC<Props> = ({ qrCode, setQrCode }) => {

  if (!qrCode) return null;

  return (
    <>
      <Dialog open={qrCode !== null} onOpenChange={() => setQrCode(null)}>
        <DialogContent className='flex flex-col items-center text-center' aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className='text-center'>{QR_CODE_DIALOG_TITLE}</DialogTitle>
          </DialogHeader>
          <ErrorBoundary errorText="Too much data for QR Code to handle, please download the recipe instead.">
            {qrCode && <QRCode className='mt-5' value={qrCode ?? ""} />}
          </ErrorBoundary>
        </DialogContent>
      </Dialog></>
  )
}