import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-navy-900">
      <Container className="py-10 sm:py-12">
        {eyebrow && (
          <div className="text-[12px] font-extrabold uppercase tracking-wider text-amber-400">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 max-w-2xl text-[28px] font-extrabold leading-tight tracking-tight text-white sm:text-[36px]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-[15.5px] font-medium text-[#C6D6E3]">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}
