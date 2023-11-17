import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn, FormSchema } from '/@/components/Table';

/**
 * transform mock data
 * {
 *  0: '华东分部',
 * '0-0': '华东分部-研发部'
 * '0-1': '华东分部-市场部',
 *  ...
 * }
 */
export const deptMap = (() => {
  const pDept = ['华东分部', '华南分部', '西北分部'];
  const cDept = ['研发部', '市场部', '商务部', '财务部'];

  return pDept.reduce((map, p, pIdx) => {
    map[pIdx] = p;

    cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

    return map;
  }, {});
})();

export const columns: BasicColumn[] = [
  {
    title: 'ip',
    dataIndex: 'account',
    width: 120,
    sorter: true,
  },
  {
    title: 'ipv4/ipv6',
    dataIndex: 'nickname',
    width: 120,
    filters: [
      { text: 'ipv4', value: 'ipv4' },
      { text: 'ipv4', value: 'ipv6' },
    ],
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: 'ispId',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: '所属部门',
    dataIndex: 'dept',
    customRender: ({ value }) => {
      return deptMap[value];
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: 'ip',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: 'serverId',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'field42',
    component: 'Select',
    label: 'ipv4/ipv6',
    colProps: {
      span: 8,
    },
    componentProps: {
      mode: 'multiple',
      options: [
        {
          label: 'ipv4',
          value: '1',
          key: '1',
        },
        {
          label: 'ipv6',
          value: '2',
          key: '2',
        },
      ],
      onChange: (value) => {
        console.log(value, '123');
      },
    },
  },
  ...getAdvanceSchema(5),
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        trigger: 'blur',
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (!value) return resolve();
            isAccountExist(value)
              .then(resolve)
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
