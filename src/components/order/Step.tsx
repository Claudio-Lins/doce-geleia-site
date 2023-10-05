interface StepProps {
  currentStep: boolean
  title: string
  step: number
}

export function Step({ title, currentStep, step }: StepProps) {
  return (
    <div className="flex w-full flex-col justify-center items-center md:justify-start md:flex-row gap-2">
      <div
        className={`
      flex h-8 w-8 items-center justify-center rounded-full text-xl
      ${
        currentStep
          ? "text-black bg-white h-8 w-8"
          : "text-white  text-lg bg-transparent border-white border-[1px] h-8 w-8"
      }
      `}
      >
        {step}
      </div>
      <div className="flex flex-col gap-1">
        <p className="-mb-1 text-xs tracking-wide text-white">Passo {step}</p>
        <p className="tracking-tight text-white leading-5 hidden md:flex">
          {title}
        </p>
      </div>
    </div>
  )
}
