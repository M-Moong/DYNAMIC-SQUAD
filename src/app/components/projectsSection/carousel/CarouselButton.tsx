import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import iconLeft from '@public/icons/icon-arrow-left.svg';
import iconRight from '@public/icons/icon-arrow-right.svg';
import Image from 'next/image';

interface UsePrevNextButtonsType {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = ({ ...restProps }) => {
  return (
    <button className="flex items-center justify-center disabled:hidden" type="button" {...restProps}>
      <Image src={iconLeft} width={28} height={24} alt="이전" />
    </button>
  );
};

export const NextButton: React.FC<PropType> = ({ ...restProps }) => {
  return (
    <button className="flex items-center justify-center disabled:hidden" type="button" {...restProps}>
      <Image src={iconRight} width={28} height={24} alt="다음" />
    </button>
  );
};
