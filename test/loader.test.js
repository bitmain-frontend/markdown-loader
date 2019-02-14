
import compiler from './compiler.js';

test('Inserts markdown and outputs html with toc', async () => {
  const stats = await compiler('./example.md');
  const output = stats.toJson().modules[0].source;
  expect(output).toEqual(expect.stringContaining("<h2 id=\\\"人脸识别算法api\\\">人脸识别算法API</h2>"));
  expect(output).toEqual(expect.stringContaining("<ul class=\\\"toc-list\\\">"));
  expect(output).toEqual(expect.stringContaining("<p>这里是具体的api内容</p>\\n\";"));
});
