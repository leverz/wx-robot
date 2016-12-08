const qList = [
    "你未来的目标是什么？", 
    "实现这些目标有什么痛点？（行业痛点、公司发展痛点、客户痛点）",
    "你所看到的，这个行业跟过去有什么不一样了？",
    "这个行业最关键的岗位是什么？",
    "这个岗位跟过去有什么变化？",
    "未来可能是什么将这个行业颠覆？"
]
const checkQuestion = (data, question) => {
    if (question.length < 6) {
        const qlen = question.length
        return qList[qlen === 0 ? 0 : qlen - 1]
    }
}