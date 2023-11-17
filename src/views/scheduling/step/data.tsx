import { FormSchema } from '/@/components/Form';

const basicOptions: LabelValueOptions = [
  {
    label: '远程采集',
    value: '0',
  },
  {
    label: '监控告警',
    value: '1',
  },
  {
    label: '监控数据',
    value: '2',
  },
];

const storeTypeOptions: LabelValueOptions = [
  {
    label: '私密',
    value: '1',
  },
  {
    label: '公开',
    value: '2',
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'f1',
    component: 'Input',
    label: '脚本名称',
    required: true,
  },
  {
    field: 'f2',
    component: 'IconPicker',
    label: '图标',
    required: false,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f4',
    component: 'Select',
    label: '采集类型',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },

  {
    field: 'f42',
    component: 'Select',
    label: '工具类型',
    componentProps: {
      options: [
        {
          label: 'wstools',
          value: '0',
        },
        {
          label: 'shell',
          value: '1',
        },
        {
          label: 'python',
          value: '2',
        },
      ],
    },
    required: true,
    colProps: {},
  },
  {
    field: 'f13',
    component: 'Input',
    label: '脚本路径',
    colProps: {
      offset: 2,
    },
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return values.f4 !== '0';
    },
  },

  {
    field: 'f40',
    component: 'InputNumber',
    label: '优先级',
    required: true,
    defaultValue: 2,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 'f3',
    component: 'InputTextArea',
    label: '描述',
    required: false,
    colProps: {},
  },
  {
    field: 'f5',
    component: 'AddTag',
    label: '标签',
    required: false,
    colProps: {
      offset: 2,
    },
  },
];

export const testSchemas: FormSchema[] = [
  {
    field: 'f4',
    component: 'Select',
    label: '工具类型',
    componentProps: {
      options: [
        {
          label: 'wstools',
          value: '0',
        },
        {
          label: 'shell',
          value: '1',
        },
        {
          label: 'python',
          value: '2',
        },
      ],
    },
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'f1',
    component: 'Input',
    label: '脚本路径',
    colProps: {
      span: 12,
    },
  },
];

export const taskSchemas: FormSchema[] = [
  {
    field: 't1',
    component: 'Input',
    label: '任务名',
    required: true,
  },
  {
    field: 't2',
    component: 'Input',
    label: '任务描述',
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't3',
    component: 'Select',
    label: '执行人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't4',
    component: 'Select',
    label: '责任人',
    componentProps: {
      options: basicOptions,
    },
    required: true,
  },
  {
    field: 't5',
    component: 'TimePicker',
    label: '生效日期',
    required: true,
    componentProps: {
      style: { width: '100%' },
    },
    colProps: {
      offset: 2,
    },
  },
  {
    field: 't6',
    component: 'Select',
    label: '任务类型',
    componentProps: {
      options: storeTypeOptions,
    },
    required: true,
    colProps: {
      offset: 2,
    },
  },
];
