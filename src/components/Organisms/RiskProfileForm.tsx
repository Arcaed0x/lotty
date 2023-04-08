import Modal from "@/components/Atoms/Modal";
import CurrencyField from "@/components/Molecules/CurrencyField";
import ContentCard from "@/components/Molecules/ContentCard";
import RiskTagInputField from "@/components/Molecules/RiskTagInputField";
import TextInputField from "@/components/Molecules/TextInputField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { deployNotification } from "@/utils/deployNotification";
import { nanoid } from "nanoid";

interface Props {
  onSubmit: SubmitHandler<RiskProfile>;
  purpose: "Create" | "Edit";
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  initialValue?: RiskProfile;
}

const CreateRiskProfileFormSchema = z.object({
  id: z.string().nonempty("Hmmmm"),
  name: z.string().nonempty("Risk profile name is required."),
  currency: z.enum(["USD", "EUR", "GBP"]),
  amount: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce
      .number({ invalid_type_error: "Account sized must be a number" })
      .positive("Account size must be positive")
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(String(value)),
        "Account size must be to 2 decimal places"
      )
  ),
  riskPercentages: z
    .array(z.number().positive().max(99, "Please enter a value below 99"))
    .nonempty(),
});

export type RiskProfile = z.infer<typeof CreateRiskProfileFormSchema>;

const purposeButtonMap: Record<Props["purpose"], string> = {
  Create: "Create",
  Edit: "Save",
};

const purposeActionMap: Record<Props["purpose"], string> = {
  Create: "created",
  Edit: "updated",
};

const CreateRiskProfileForm = ({
  onSubmit,
  purpose,
  isModalOpen,
  closeModal,
  openModal,
  initialValue,
}: Props) => {
  const defaultCreateInitialValues: RiskProfile = {
    id: nanoid(),
    name: "",
    currency: "USD",
    amount: 1000,
    riskPercentages: [0.25],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RiskProfile>({
    values: initialValue,
    defaultValues: defaultCreateInitialValues,
    resolver: zodResolver(CreateRiskProfileFormSchema),
  });

  return (
    <>
      <button className="button" onClick={openModal}>
        Create Risk Profile
      </button>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <ContentCard>
          <form
            onSubmit={handleSubmit((data) => {
              closeModal();
              reset(defaultCreateInitialValues);
              deployNotification(
                <>
                  &apos;{data.name}&apos; Risk profile successfully{" "}
                  {purposeActionMap[purpose]}!✨
                </>,
                undefined,
                "is-success"
              );
              onSubmit(data);
            })}
          >
            <h1 className="title">{purpose} Risk Profile</h1>

            <input type="hidden" {...register("id")} />

            <TextInputField
              placeholder="Risk profile name"
              title="Name"
              register={register("name")}
              error={errors.name}
            />

            <br />

            <CurrencyField
              title="Account Details"
              placeholder="Enter Account Size"
              currencyLink={{
                register: register("currency"),
                error: errors.currency,
              }}
              amountLink={{
                register: register("amount"),
                error: errors.amount,
              }}
            />

            <br />

            <Controller
              name="riskPercentages"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <>
                    <RiskTagInputField
                      title="Risk Amount"
                      onAdd={(risk: number) => {
                        field.onChange([...new Set([...field.value, risk])]);
                      }}
                      onDelete={(risk: number) => {
                        field.onChange(
                          field.value.filter(
                            (riskPercentage) => riskPercentage !== risk
                          )
                        );
                      }}
                      placeholder="Risk Amount as percentage"
                      buttonText="Add"
                      value={field.value}
                    />
                  </>
                );
              }}
            />

            <button className="button" type="submit">
              {purposeButtonMap[purpose]}
            </button>
          </form>
        </ContentCard>
      </Modal>
    </>
  );
};

export default CreateRiskProfileForm;
