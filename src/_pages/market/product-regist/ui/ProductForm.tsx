'use client';

import { useRef, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ImageUploadSection } from './ImageUploadSection';
import { TitleSection } from './TitleSection';
import { PriceField } from './PriceField';
import { ShippingSection } from './ShippingSection';
import { DirectTradeSection } from './DirectTradeSection';
import { RichTextEditor } from './RichTextEditor/RichTextEditor';
import { FormButtons } from './FormButtons';
import {
  INITIAL_FORM_DATA,
  TITLE_MAX_LENGTH,
  ProductFormSchema,
  type ProductFormValues,
} from '../model/product-form';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  initialImageUrl?: string;
  onSubmit: (data: ProductFormValues) => void;
  isPending: boolean;
  isEditMode: boolean;
}

export function ProductForm({
  defaultValues,
  initialImageUrl,
  onSubmit,
  isPending,
  isEditMode,
}: ProductFormProps) {
  const [currentInitialImageUrl, setCurrentInitialImageUrl] = useState<
    string | undefined
  >(initialImageUrl);
  const imageRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: defaultValues
      ? { ...INITIAL_FORM_DATA, ...defaultValues }
      : INITIAL_FORM_DATA,
  });

  const shippingType = useWatch({ control, name: 'shippingType' });
  const directTradeEnabled = useWatch({ control, name: 'directTradeEnabled' });
  const titleValue = useWatch({ control, name: 'title' });

  const handleImageChange = (file: File | undefined) => {
    if (!file) setCurrentInitialImageUrl(undefined);
  };

  const handleValidSubmit = (data: ProductFormValues) => {
    if (!data.mainImageFile && !currentInitialImageUrl) {
      setError('mainImageFile', { message: '대표 이미지를 등록해주세요' });
      imageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    onSubmit(data);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(handleValidSubmit)(e);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
      <div ref={imageRef}>
        <Controller
          control={control}
          name="mainImageFile"
          render={({ field }) => (
            <ImageUploadSection
              mainImageFile={field.value}
              onImageChange={(file) => {
                field.onChange(file);
                handleImageChange(file);
              }}
              error={errors.mainImageFile?.message}
              initialImageUrl={currentInitialImageUrl}
            />
          )}
        />
      </div>

      <hr className="border-gray-100" />

      <section className="flex flex-col gap-8">
        <TitleSection
          label="제목"
          required
          placeholder="상품 제목을 입력해주세요"
          maxLength={TITLE_MAX_LENGTH}
          showCounter
          currentLength={titleValue?.length ?? 0}
          registration={register('title')}
          error={errors.title?.message}
        />

        <hr className="border-gray-200" />

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <PriceField
              label="가격"
              required
              value={field.value}
              onChange={field.onChange}
              negotiableRegistration={register('priceNegotiable')}
              error={errors.price?.message}
            />
          )}
        />

        <hr className="border-gray-200" />

        <Controller
          control={control}
          name="standardShipping"
          render={({ field }) => (
            <ShippingSection
              shippingType={shippingType}
              shippingTypeRegistration={register('shippingType')}
              standardShippingValue={field.value}
              onStandardShippingChange={field.onChange}
              error={errors.standardShipping?.message}
            />
          )}
        />

        <hr className="border-gray-200" />

        <Controller
          control={control}
          name="directTradeLocation"
          render={({ field: locationField }) => (
            <DirectTradeSection
              directTradeEnabled={directTradeEnabled}
              directTradeEnabledRegistration={register('directTradeEnabled')}
              directTradeLocation={locationField.value}
              onDirectTradeLocationChange={locationField.onChange}
              directTradePlaceRegistration={register('directTradePlace')}
              error={errors.directTradeLocation?.message}
            />
          )}
        />
      </section>

      <hr className="border-gray-100" />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            error={errors.description?.message}
          />
        )}
      />

      <FormButtons isPending={isPending} isEditMode={isEditMode} />
    </form>
  );
}
