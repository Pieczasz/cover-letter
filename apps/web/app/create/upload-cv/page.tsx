import MaxWidthWrapper from '../../../components/layout/MaxWidthWrapper';
import { FileUpload } from '../../../components/upload/FileUpload';

export default function UploadPage() {
  return (
    <div className="w-full flex justify-center items-center min-h-[85vh]">
      <MaxWidthWrapper>
        <FileUpload />
      </MaxWidthWrapper>
    </div>
  );
}
