import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

export function CoverLetterForm() {
  return (
    <div className="max-w-3xl mx-auto">
      <form className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Generate Your Cover Letter
        </h2>
        <div className="space-y-6">
          <Input type="file" label="Upload Your CV" accept=".pdf,.doc,.docx" />
          <TextArea
            label="Job Description"
            placeholder="Paste the job description here..."
          />
          <Input
            type="url"
            label="LinkedIn Profile"
            placeholder="https://linkedin.com/in/..."
          />
          <Input
            type="url"
            label="GitHub Profile"
            placeholder="https://github.com/..."
          />
          <Button type="submit" className="w-full">
            Generate Cover Letter
          </Button>
        </div>
      </form>
    </div>
  );
}
