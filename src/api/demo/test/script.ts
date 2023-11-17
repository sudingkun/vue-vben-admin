import { defHttp } from '/@/utils/http/axios';
import { ScriptParams } from '@/api/demo/model/scriptModel';

enum Api {
  getTags = '/script/getTags',
  getScriptList = '/script/list',
}

export const getTags = () => defHttp.get({ url: Api.getTags });

export const getScriptList = (params: ScriptParams) =>
  defHttp.post({ url: Api.getScriptList, params });
