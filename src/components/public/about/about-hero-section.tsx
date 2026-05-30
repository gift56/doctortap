import Image from "next/image";

const ABOUT_TEAM_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop";

export function AboutHeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-center text-3xl font-light tracking-wide text-text-muted">
        ABOUT <span className="font-bold text-text-primary">US</span>
      </h1>

      <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-5">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border-default shadow-xl md:col-span-2">
          <Image
            src={ABOUT_TEAM_IMAGE}
            alt="Healthcare professionals providing trusted medical care"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="md:col-span-3">
          <div className="space-y-4 text-base leading-relaxed text-text-secondary">
            <p>
              Welcome To DoctorTap, Your Trusted Partner In Managing Your
              Healthcare Needs Conveniently And Efficiently. At DoctorTap, We
              Understand The Challenges Individuals Face When It Comes To
              Scheduling Doctor Appointments And Managing Their Health Records.
            </p>
            <p>
              DoctorTap Is Committed To Excellence In Healthcare Technology. We
              Continuously Strive To Enhance Our Platform, Integrating The Latest
              Advancements To Improve User Experience And Deliver Superior Service.
              Whether You&apos;re Booking Your First Appointment Or Managing Ongoing
              Care, DoctorTap Is Here To Support You Every Step Of The Way.
            </p>
          </div>

          <h2 className="mt-6 mb-2 text-lg font-semibold text-text-primary">
            Our Vision
          </h2>
          <p className="text-base leading-relaxed text-text-secondary">
            Our Vision At DoctorTap Is To Create A Seamless Healthcare Experience
            For Every User. We Aim To Bridge The Gap Between Patients And Healthcare
            Providers, Making It Easier For You To Access The Care You Need, When You
            Need It.
          </p>
        </div>
      </div>
    </section>
  );
}
