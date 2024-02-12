"use strict";
const formContainer = document.getElementById('form-container');

function buildForm(formDef) {
    const form = document.createElement('form');
    form.action = 'https://fe.it-academy.by/TestForm.php';
    form.method = 'post';
    form.className = 'custom-form';

    formDef.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        if (field.label) {
            const label = document.createElement('label');
            label.textContent = field.label;
            formGroup.appendChild(label);
        }

        switch (field.kind) {
            case 'longtext':
            case 'shorttext':
            case 'number':
                const input = document.createElement('input');
                input.type = field.kind === 'number' ? 'number' : 'text';
                input.name = field.name;
                formGroup.appendChild(input);
                break;

            case 'combo':
                const select = document.createElement('select');
                select.name = field.name;

                field.variants.forEach(variant => {
                    const option = document.createElement('option');
                    option.value = variant.value;
                    option.text = variant.text;
                    select.appendChild(option);
                });

                formGroup.appendChild(select);
                break;

            case 'radio':
                field.variants.forEach(variant => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = field.name;
                    radio.value = variant.value;

                    const label = document.createElement('label');
                    label.appendChild(radio);
                    label.appendChild(document.createTextNode(variant.text));
                    formGroup.appendChild(label);
                });
                break;

            case 'check':
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = field.name;
                formGroup.appendChild(checkbox);
                break;

            case 'memo':
                const textarea = document.createElement('textarea');
                textarea.name = field.name;
                formGroup.appendChild(textarea);
                break;

            case 'submit':
                const submitButton = document.createElement('input');
                submitButton.type = 'submit';
                submitButton.value = field.caption || 'Submit';
                formGroup.appendChild(submitButton);
                break;
        }

        form.appendChild(formGroup);
    });

    formContainer.appendChild(form);
}

const formDef1 =
    [
        { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
        { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
        { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
        { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
        },
        { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
        { label: 'Описание сайта:', kind: 'memo', name: 'description' },
        { caption: 'Опубликовать', kind: 'submit' },
    ];


buildForm(formDef1);

