import React from 'react';


interface UniProps{
    topic: string,
    massage: string,

}
const Response = () => {
    const universities = [
        {
            type: "最佳匹配专业",
            typeList: "list",
            massage: "根据您提供的信息，以下是我们为Kevin同学推荐的最适合他的3个专业:",
            list: [
                {
                    description: "计算机科学(Computer Science(匹配程度:95):计算机科学专业在全球范围 内，尤其是在美国、英国、加拿大和澳大利亚，均有极高的需求和声誉，能够为学生 提供广泛的职业选择和较高的起薪，这与Kevin的预期年收入范围($30,000 - $70,000) 相符。计算机科学领域的多样性和灵活性也意味着，不论他未来的职业偏好如何变 化，都能找到合适的职业路径。此外，计算机科学专业的学习将培养他的逻辑思维、 问题解决能力和技术技能，这些技能在各行各业都有广泛应用。Kevin对计算机、游戏 设计的兴趣以及他的INFP性格，表明他可能更倾向于富有创造性的技术解决方案，计 算机科学专业能够提供足够的空间让他探索和实现这些解决方案。",
                    typeName: "潜在的专业困境",
                    listText: [
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        }
                    ]
                },
                {
                    description: "计算机科学(Computer Science(匹配程度:95):计算机科学专业在全球范围 内，尤其是在美国、英国、加拿大和澳大利亚，均有极高的需求和声誉，能够为学生 提供广泛的职业选择和较高的起薪，这与Kevin的预期年收入范围($30,000 - $70,000) 相符。计算机科学领域的多样性和灵活性也意味着，不论他未来的职业偏好如何变 化，都能找到合适的职业路径。此外，计算机科学专业的学习将培养他的逻辑思维、 问题解决能力和技术技能，这些技能在各行各业都有广泛应用。Kevin对计算机、游戏 设计的兴趣以及他的INFP性格，表明他可能更倾向于富有创造性的技术解决方案，计 算机科学专业能够提供足够的空间让他探索和实现这些解决方案。",
                    typeName: "潜在的专业困境",
                    listText: [
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        }
                    ]
                },
                {
                    description: "计算机科学(Computer Science(匹配程度:95):计算机科学专业在全球范围 内，尤其是在美国、英国、加拿大和澳大利亚，均有极高的需求和声誉，能够为学生 提供广泛的职业选择和较高的起薪，这与Kevin的预期年收入范围($30,000 - $70,000) 相符。计算机科学领域的多样性和灵活性也意味着，不论他未来的职业偏好如何变 化，都能找到合适的职业路径。此外，计算机科学专业的学习将培养他的逻辑思维、 问题解决能力和技术技能，这些技能在各行各业都有广泛应用。Kevin对计算机、游戏 设计的兴趣以及他的INFP性格，表明他可能更倾向于富有创造性的技术解决方案，计 算机科学专业能够提供足够的空间让他探索和实现这些解决方案。",
                    typeName: "潜在的专业困境",
                    listText: [
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        },
                        {
                            text: "计算机科学专业需要深入理解复杂的算法和编程语言。学生常常感到挫败，尤其 是在面对高级编程挑战或数据结构问题时。比如，理解递归或并发编程概念对许 多学生来说是一大挑战。",
                        }
                    ]
                }
            ]
        }
    ]

    const uni = [
        {
            type: "专业对应大学推荐",
            typeList: "flactuation",
            massage: "根据您提供的信息，以下是我们为Kevin同学推荐的最适合他的3个专业:",
            list: [
                {
                    typeName: "潜在的专业困境",
                    listCountry: [
                        {
                            countryName: "美国USA:",
                            listUni:[
                                {
                                    university: "麻省理工学院(Massachusetts Institute of Technology):",
                                    uniDescription: "MIT的计算机科学和人工智能实验室(CSAIL)是世界领先的研究中心之一，提 供创新和前沿的计算机科学教育。MIT的计算机科学专业不仅教授理论知识，还 强调实践和创新，学生有机会参与到突破性研究项目中，从而为未来科技行业的 工作做好准备。"
                                },
                                {
                                    university: "麻省理工学院(Massachusetts Institute of Technology):",
                                    uniDescription: "MIT的计算机科学和人工智能实验室(CSAIL)是世界领先的研究中心之一，提 供创新和前沿的计算机科学教育。MIT的计算机科学专业不仅教授理论知识，还 强调实践和创新，学生有机会参与到突破性研究项目中，从而为未来科技行业的 工作做好准备。"
                                }
                            ]
                        },
                        {
                            countryName: "英国British:",
                            listUni:[
                                {
                                    university: "帝国理工学院(Imperial College London):",
                                    uniDescription: "帝国理工以其科研实力和与行业的紧密联系而著名。计算机科学专业的学生可以 从事人工智能、机器学习、数据科学等热门领域的研究，毕业生就业前景广阔。"
                                },
                                {
                                    university: "帝国理工学院(Imperial College London):",
                                    uniDescription: "剑桥大学的计算机科学课程深受全球认可，强调理论基础和实践应用的结合。剑 桥提供先进的研究设施和丰富的学术资源，学生有机会参与到创新项目中，与领 域内的专家一起工作。"
                                }
                            ]
                        }
                    ]

                }
            ]
        }
    ]
    return (
        <section className='p-[10px] md:p-[50px]'>
            {universities.map((el) => (
                <div key={el.type}>
                    {el?.typeList === "list" && (
                        <div>
                            <section className="p-10 bg-blue-800 rounded-3xl">
                                <h1 className="text-white mb-2">{el?.type}</h1>
                                <p className="text-white">{el?.massage}</p>
                            </section>
                            {el.list.map((prop, index) => (
                                <section key={prop.typeName}>
                                    <p className='m-[20px] text-[20px]'>{prop.description}</p>
                                    <br/>
                                    <p className='text-center font-bold text-2xl'>{prop.typeName}</p>
                                    {prop?.listText.map((text, index) => (
                                        <section key={index}>
                                            <ul>
                                                <li className="m-[20px] text-[15px]">
                                                    {index+1}. {text.text}
                                                </li>
                                            </ul>
                                        </section>
                                    ))}
                                    <div className="mb-7 border-b-2 border-blue-800"><p>Page: {index}</p></div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {uni.map((el) => (
                <div key={el.type}>
                    {el?.typeList === "flactuation" && (
                        <div>
                            <section className="p-10 bg-blue-800 rounded-3xl">
                                <h1 className="text-white mb-2">{el?.type}</h1>
                                <p className="text-white">{el?.massage}</p>
                            </section>
                            {el.list.map((prop, index) => (
                                <section key={prop.typeName}>
                                    {/*<p className='m-[20px] text-[20px]'>{prop.description}</p>*/}
                                    {/*<br/>*/}
                                    <p className='mb-7 mt-7 text-center font-bold text-2xl'>{prop.typeName}</p>
                                    {prop?.listCountry.map((text, index) => (
                                        <section key={index}>
                                            <p className='mb-7 mt-7 text-center font-bold text-2xl text-blue-800'>{text.countryName}</p>
                                            {text.listUni.map((elem,index) => (
                                                <section key={index}>
                                                    <p className='m-[20px] text-[20px]'>- {elem.university}</p>
                                                    <br/>
                                                    <p className='m-0 mx-10 text-[20px]'>{elem.uniDescription}</p>
                                                </section>
                                            ))}
                                        </section>
                                    ))}
                                    <div className="mb-7 mt-7 border-b-2 border-blue-800"><p>Page: {index}</p></div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default Response;