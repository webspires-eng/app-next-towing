import { Award, Clock, Shield } from 'lucide-react';

const drivers = [
  {
    name: 'Amelia Khan',
    role: 'Lead recovery specialist',
    experience: '12 years on heavy & motorway recovery',
  },
  {
    name: 'Marcus Doyle',
    role: 'EV recovery technician',
    experience: 'IMI Level 4 EV qualified, rapid response lead',
  },
  {
    name: 'Jade Roberts',
    role: 'Dispatcher & customer liaison',
    experience: 'Keeps updates flowing from first call to drop-off',
  },
];

const highlights = [
  { icon: Award, label: 'City & Guilds recovery trained' },
  { icon: Clock, label: 'Average 7 years tenure' },
  { icon: Shield, label: 'Enhanced DBS & insurance vetted' },
];

export default function DriverProfiles() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6 xl:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Meet the team</p>
            <h2 className="text-balance text-4xl font-semibold text-slate-900">Experienced recovery professionals on every job</h2>
            <p className="text-base text-slate-600">
              Our operators are trained beyond basic towing qualifications. Each undergoes regular scenario training, customer
              service refreshers, and equipment drills so you feel supported throughout.
            </p>

            <ul className="flex flex-wrap gap-4 text-sm text-slate-600">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {drivers.map(({ name, role, experience }) => (
              <div key={name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600">
                  <span className="text-xl font-semibold">{name.split(' ')[0]}</span>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">{name}</p>
                <p className="text-sm text-slate-500">{role}</p>
                <p className="mt-3 text-sm text-slate-600">{experience}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
