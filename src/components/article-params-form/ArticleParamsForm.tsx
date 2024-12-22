import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import React, { FormEvent, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	setState: (value: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ setState }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleChange = (event: string) => {
		return (value: OptionType) => {
			setFormState((state) => ({
				...state,
				[event]: value,
			}));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<div
				onClick={() => setIsOpen(false)}
				className={clsx(styles.overlay, isOpen && styles.overlay_open)}></div>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер Шрифта'
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет Шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет Фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина Контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
