import dash_materialsintelligence as dmi
import dash
import dash_html_components as html

app = dash.Dash('')

app.scripts.config.serve_locally = True

testTokens = [{'text': 'ab', 'start': 1, 'end': 3},
              {'text': 'cd', 'start': 4, 'end': 6},
              {'text': 'ef', 'start': 7, 'end': 9},
              {'text': '.', 'start': 9, 'end': 10},
              {'text': 'gf', 'start': 11, 'end': 13},
              ]
annotations = [True, True, False, False, False]

app.layout = html.Div([
    dmi.Annotatable(
        id='input',
        value='my-value',
        className='abs-token',
        isSelected=True
    ),
    html.Div(id='output'),
    dmi.AnnotationContainer(
        tokens=testTokens,
        annotations=annotations,
        className="testClass",
        id="testId"
    ),
    dmi.Label(
        id="testId",
        isSelected=False,
        className="label highlighted",
        value="Label 1",
    ),
    dmi.Label(
        id="testId",
        isSelected=False,
        className="label highlighted",
        value="Label 2"
    )
])

# @app.callback(
#     dash.dependencies.Output('output', 'children'),
#     [dash.dependencies.Input('input', 'value')])
# def display_output(value):
#     return 'You have clicked {} times'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
