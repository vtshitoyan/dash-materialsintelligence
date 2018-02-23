import dash_materialsintelligence as dmi
import dash
import dash_html_components as html

app = dash.Dash('')

app.css.append_css({"external_url": "https://codepen.io/chriddyp/pen/bWLwgP.css"})

app.scripts.config.serve_locally = True

testTokens = [[{'text': 'ab', 'start': 1, 'end': 3},
              {'text': 'cd', 'start': 4, 'end': 6},
              {'text': 'ef', 'start': 7, 'end': 9},
              {'text': '.', 'start': 9, 'end': 10},
              {'text': 'gf', 'start': 11, 'end': 13}],
              [{'text': 'AB', 'start': 1, 'end': 3},
              {'text': 'CD', 'start': 4, 'end': 6},
              {'text': 'EF', 'start': 7, 'end': 9},
              {'text': '.', 'start': 9, 'end': 10},
              {'text': 'GF', 'start': 11, 'end': 13}]]

annotations = [[{'id': 'token-0-2', 'annotation': None},
               {'id': 'token-3-5', 'annotation': 'material'},
               {'id': 'token-6-8', 'annotation': None},
               {'id': 'token-8-9', 'annotation': 'inorganic_crystal'},
               {'id': 'token-10-12', 'annotation': None}],
               [{'id': 'token-0-2', 'annotation': 'main_material'},
               {'id': 'token-3-5', 'annotation': None},
               {'id': 'token-6-8', 'annotation': None},
               {'id': 'token-8-9', 'annotation': None},
               {'id': 'token-10-12', 'annotation': None}]]

testLabels = [{'text': 'Material', 'value': 'material'},
              {'text': 'Inorganic Crystal', 'value': 'inorganic_crystal'},
              {'text': 'Main Material', 'value': 'main_material'}]

app.layout = html.Div([
    dmi.AnnotationContainer(
        tokens=testTokens,
        pastAnnotations=annotations,
        className="testClass",
        id="testId",
        labels=testLabels,
        selectedValue=testLabels[1]["value"]
    ),
    dmi.DropdownCreatable(
        options=[
            {'value': 'R', 'label': 'Red'},
            {'value': 'G', 'label': 'Green'},
            {'value': 'B', 'label': 'Blue'}],
        multi=True
    )
])

# @app.callback(
#     dash.dependencies.Output('output', 'children'),
#     [dash.dependencies.Input('input', 'value')])
# def display_output(value):
#     return 'You have clicked {} times'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
