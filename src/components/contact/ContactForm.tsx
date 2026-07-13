"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { contactCategories, type ContactFormValues } from "@/content/contact";
import { submitContact } from "@/lib/contact";

type Errors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  company: "",
  name: "",
  email: "",
  tel: "",
  category: "",
  message: "",
  agreed: false,
};

const inputClass =
  "w-full border border-line-soft bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:border-bordeaux focus:outline-none aria-[invalid=true]:border-bordeaux";

function validate(values: ContactFormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "氏名を入力してください。";
  if (!values.email.trim()) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "メールアドレスの形式が正しくありません。";
  }
  if (values.tel.trim() && !/^[0-9+\-() ]{8,15}$/.test(values.tel.trim())) {
    errors.tel = "電話番号の形式が正しくありません。";
  }
  if (!values.category) errors.category = "お問い合わせ種別を選択してください。";
  if (!values.message.trim()) {
    errors.message = "お問い合わせ内容を入力してください。";
  }
  if (!values.agreed) {
    errors.agreed = "プライバシーポリシーへの同意が必要です。";
  }
  return errors;
}

/**
 * お問い合わせフォーム。
 * バリデーションはフロントエンドで行い、送信処理は lib/contact.ts に分離。
 * 送信先が確定したら lib/contact.ts のみ差し替えればよい。
 */
export function ContactForm({
  defaultCategory = "",
}: {
  defaultCategory?: string;
}) {
  const [values, setValues] = useState<ContactFormValues>({
    ...initialValues,
    category: contactCategories.find((c) => c === defaultCategory) ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const set = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document
        .querySelector("[aria-invalid='true']")
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setStatus("sending");
    const result = await submitContact(values);
    if (result.ok) {
      setStatus("done");
    } else {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="border border-line-soft bg-paper p-8 text-center md:p-14">
        <p className="font-en text-xs font-bold tracking-[0.22em] text-bordeaux">
          THANK YOU
        </p>
        <p className="mt-4 font-serif-jp text-xl font-semibold text-ink">
          お問い合わせを受け付けました。
        </p>
        <p className="mt-4 text-sm leading-loose text-ink-muted">
          内容を確認のうえ、担当者よりご連絡いたします。
          <br />
          しばらく経っても返信がない場合は、お手数ですが再度お問い合わせください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className="text-sm font-bold text-ink">
            会社名
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            className={`mt-2 ${inputClass}`}
            placeholder="株式会社〇〇（個人の方は不要）"
          />
        </div>
        <div>
          <label htmlFor="contact-name" className="text-sm font-bold text-ink">
            氏名
            <span className="ml-2 text-xs font-medium text-bordeaux">必須</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={`mt-2 ${inputClass}`}
            placeholder="山田 太郎"
          />
          {errors.name && (
            <p id="error-name" role="alert" className="mt-2 text-xs text-bordeaux">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-bold text-ink">
            メールアドレス
            <span className="ml-2 text-xs font-medium text-bordeaux">必須</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={`mt-2 ${inputClass}`}
            placeholder="taro@example.com"
          />
          {errors.email && (
            <p id="error-email" role="alert" className="mt-2 text-xs text-bordeaux">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-tel" className="text-sm font-bold text-ink">
            電話番号
          </label>
          <input
            id="contact-tel"
            type="tel"
            autoComplete="tel"
            value={values.tel}
            onChange={(e) => set("tel", e.target.value)}
            aria-invalid={errors.tel ? true : undefined}
            aria-describedby={errors.tel ? "error-tel" : undefined}
            className={`mt-2 ${inputClass}`}
            placeholder="03-0000-0000"
          />
          {errors.tel && (
            <p id="error-tel" role="alert" className="mt-2 text-xs text-bordeaux">
              {errors.tel}
            </p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-bold text-ink">
          お問い合わせ種別
          <span className="ml-2 text-xs font-medium text-bordeaux">必須</span>
        </legend>
        <div
          className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3"
          role="radiogroup"
          aria-invalid={errors.category ? true : undefined}
          aria-describedby={errors.category ? "error-category" : undefined}
        >
          {contactCategories.map((category) => (
            <label
              key={category}
              className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                values.category === category
                  ? "border-bordeaux bg-blush/60 text-ink"
                  : "border-line-soft bg-paper text-ink-muted hover:border-bordeaux/50"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={values.category === category}
                onChange={() => set("category", category)}
                className="accent-(--color-bordeaux)"
              />
              {category}
            </label>
          ))}
        </div>
        {errors.category && (
          <p id="error-category" role="alert" className="mt-2 text-xs text-bordeaux">
            {errors.category}
          </p>
        )}
      </fieldset>

      <div>
        <label htmlFor="contact-message" className="text-sm font-bold text-ink">
          お問い合わせ内容
          <span className="ml-2 text-xs font-medium text-bordeaux">必須</span>
        </label>
        <textarea
          id="contact-message"
          rows={7}
          required
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`mt-2 ${inputClass}`}
          placeholder="ご相談内容をご記入ください"
        />
        {errors.message && (
          <p id="error-message" role="alert" className="mt-2 text-xs text-bordeaux">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={values.agreed}
            onChange={(e) => set("agreed", e.target.checked)}
            aria-invalid={errors.agreed ? true : undefined}
            aria-describedby={errors.agreed ? "error-agreed" : undefined}
            className="mt-1.5 accent-(--color-bordeaux)"
          />
          <span>
            <Link
              href="/privacy"
              className="text-bordeaux underline underline-offset-4 hover:opacity-80"
              target="_blank"
            >
              プライバシーポリシー
            </Link>
            に同意する
            <span className="ml-2 text-xs font-medium text-bordeaux">必須</span>
          </span>
        </label>
        {errors.agreed && (
          <p id="error-agreed" role="alert" className="mt-2 text-xs text-bordeaux">
            {errors.agreed}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-bordeaux">
          送信に失敗しました。時間をおいて再度お試しください。
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-bordeaux px-10 py-4 text-sm font-medium tracking-wider text-paper transition-colors duration-300 hover:bg-bordeaux-dark disabled:cursor-wait disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? "送信中…" : "この内容で送信する"}
        <span
          aria-hidden="true"
          className="font-en transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </form>
  );
}
