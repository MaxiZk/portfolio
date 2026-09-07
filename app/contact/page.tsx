import Link from "next/link";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-brand-dark mb-12">Contact</h1>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-brand-dark/50 mb-1">Email</p>
          <Link href="mailto:maxizuidwijk@gmail.com" className="text-brand-orange hover:underline">
            maxizuidwijk@gmail.com
          </Link>
        </div>
        <div>
          <p className="text-sm text-brand-dark/50 mb-1">LinkedIn</p>
          <Link
            href="https://linkedin.com/in/maximo-zuidwijk-9311271b2"
            target="_blank"
            className="text-brand-orange hover:underline"
          >
            linkedin.com/in/maximo-zuidwijk-9311271b2
          </Link>
        </div>
        <div>
          <p className="text-sm text-brand-dark/50 mb-1">GitHub</p>
          <Link href="https://github.com/MaxiZk" target="_blank" className="text-brand-orange hover:underline">
            github.com/MaxiZk
          </Link>
        </div>
      </div>
    </div>
  );
}
