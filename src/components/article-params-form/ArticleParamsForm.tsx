import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	fontFamilyOptions,
	ArticleStateType,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type FormProps = {
	draftState: ArticleStateType;
	onDraftChange: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	draftState,
	onDraftChange,
	onApply,
	onReset,
}: FormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleMouseDown = (e: MouseEvent) => {
			const target = e.target as Node;
			if (panelRef.current && !panelRef.current.contains(target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleMouseDown);

		return () => document.removeEventListener('mousedown', handleMouseDown);
	}, [isMenuOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		onReset();
		setIsMenuOpen(false);
	};

	return (
		<>
			<div ref={panelRef}>
				<ArrowButton
					isOpen={isMenuOpen}
					onClick={() => setIsMenuOpen((prev) => !prev)}
				/>
				<aside
					className={clsx(
						styles.container,
						isMenuOpen && styles.container_open
					)}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<h2 className={styles.title}>Задайте параметры</h2>
						<Select
							title='Шрифт'
							selected={draftState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option: OptionType) => {
								onDraftChange((prev) => ({
									...prev,
									fontFamilyOption: option,
								}));
							}}
						/>
						<RadioGroup
							name='fontSizeOption'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={draftState.fontSizeOption}
							onChange={(option) => {
								onDraftChange((prev) => ({
									...prev,
									fontSizeOption: option,
								}));
							}}
						/>
						<Select
							title='Цвет шрифта'
							selected={draftState.fontColor}
							options={fontColors}
							onChange={(option: OptionType) => {
								onDraftChange((prev) => ({
									...prev,
									fontColor: option,
								}));
							}}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={draftState.backgroundColor}
							options={backgroundColors}
							onChange={(option: OptionType) => {
								onDraftChange((prev) => ({
									...prev,
									backgroundColor: option,
								}));
							}}
						/>
						<Select
							title='Ширина контента'
							selected={draftState.contentWidth}
							options={contentWidthArr}
							onChange={(option: OptionType) => {
								onDraftChange((prev) => ({
									...prev,
									contentWidth: option,
								}));
							}}
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
			</div>
		</>
	);
};
