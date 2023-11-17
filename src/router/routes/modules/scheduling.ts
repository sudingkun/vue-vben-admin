import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/scheduling',
  name: 'Scheduling',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.test.scheduling.moduleName'),
  },
  children: [
    {
      path: 'task',
      name: 'Task',
      component: () => import('/@/views/scheduling/role/index.vue'),
      meta: {
        title: t('routes.test.scheduling.taskManagement'),
      },
    },
    {
      path: 'script',
      name: 'Script',
      component: () => import('/@/views/scheduling/card/index.vue'),
      meta: {
        title: t('routes.test.scheduling.scriptManagement'),
      },
    },
    {
      path: 'script_detail',
      name: 'ScriptDetail',
      component: () => import('/@/views/scheduling/step/index2.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.demo.page.formHigh'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/scheduling/script',
      },
    },
    {
      path: 'service',
      name: 'Service',
      component: () => import('/@/views/scheduling/service/FormTable.vue'),
      meta: {
        title: t('routes.test.scheduling.serviceManagement'),
      },
    },
    {
      path: 'server',
      name: 'ServerManagement',
      meta: {
        title: t('routes.test.scheduling.serverManagement'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/scheduling/account/index.vue'),
    },
    {
      path: 'server_detail',
      name: 'ServerDetail',
      component: () => import('/@/views/scheduling/about/index.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.demo.page.formHigh'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/scheduling/server',
      },
    },
    {
      path: 'test',
      name: 'Test',
      meta: {
        title: t('routes.test.scheduling.test'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/scheduling/role/index.vue'),
    },
    {
      path: 'test_info',
      name: 'TestInfo',
      component: () => import('/@/views/scheduling/account/index.vue'),
      meta: {
        hideMenu: true,
        ignoreKeepAlive: true,
        showMenu: false,
        title: t('routes.test.scheduling.serviceManagement'),
        currentActiveMenu: '/scheduling/service',
      },
    },
  ],
};

export default dashboard;
